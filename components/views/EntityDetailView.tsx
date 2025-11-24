"use client";

import { useView } from "@/components/providers/ViewContext";
import { ContactDetails } from "./entities/ContactDetails";
import { CompanyDetails } from "./entities/CompanyDetails";
import { DealDetails } from "./entities/DealDetails";

export function EntityDetailView() {
    const { viewParams } = useView();

    // Route based on entity type
    if (viewParams?.type === 'Contact') {
        return <ContactDetails />;
    }

    if (viewParams?.type === 'Company') {
        return <CompanyDetails />;
    }

    // Default to DealDetails (or check for 'Deal' type explicitly)
    return <DealDetails />;
}
