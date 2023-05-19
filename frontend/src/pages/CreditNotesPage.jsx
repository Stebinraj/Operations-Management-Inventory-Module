import React from 'react'
import Layouts from '../components/Layouts/Layouts';
import MainContent from '../components/Layouts/MainContent';
import CreditNotes from '../components/Sales/CreditNotes/CreditNotes';

const CreditNotesPage = () => {

    const creditNotes = true;

    return (
        <>
            {/* layouts components */}
            <Layouts
                mainContent={
                    <MainContent
                        creditNotes={
                            creditNotes &&
                            <CreditNotes
                                creditNotesPage={creditNotes}
                            />
                        }
                    />
                }
            />
        </>
    )
}

export default CreditNotesPage