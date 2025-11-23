export type GovernanceAction = 'approve' | 'quarantine' | 'reject' | 'auto_fix';

export interface GovernanceRule {
    id: string;
    name: string;
    description: string;
    condition: (entity: any) => boolean;
    action: GovernanceAction;
    fix?: (entity: any) => any;
}

export const governanceRules: GovernanceRule[] = [
    {
        id: 'rule_email_required',
        name: 'Mandatory Email',
        description: 'Contacts must have an email address.',
        condition: (entity) => entity.type === 'contact' && !entity.email,
        action: 'reject'
    },
    {
        id: 'rule_disposable_email',
        name: 'Block Disposable Emails',
        description: 'Quarantine contacts with disposable email domains.',
        condition: (entity) => {
            const disposableDomains = ['tempmail.com', 'mailinator.com', '10minutemail.com'];
            const domain = entity.email?.split('@')[1];
            return disposableDomains.includes(domain);
        },
        action: 'quarantine'
    },
    {
        id: 'rule_normalize_phone',
        name: 'Standardize Phone Numbers',
        description: 'Auto-format phone numbers to E.164.',
        condition: (entity) => entity.phone && !entity.phone.startsWith('+'),
        action: 'auto_fix',
        fix: (entity) => ({
            ...entity,
            phone: `+1${entity.phone.replace(/\D/g, '')}` // Naive US assumption for demo
        })
    }
];

export class GovernanceEngine {
    static evaluate(entity: any): { action: GovernanceAction; ruleId?: string; fixedEntity?: any } {
        for (const rule of governanceRules) {
            if (rule.condition(entity)) {
                if (rule.action === 'auto_fix' && rule.fix) {
                    return { action: 'auto_fix', ruleId: rule.id, fixedEntity: rule.fix(entity) };
                }
                return { action: rule.action, ruleId: rule.id };
            }
        }
        return { action: 'approve' };
    }
}
