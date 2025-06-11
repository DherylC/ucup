import React from "react";

export default function GreetingName({contact}) {
    return <React.Fragment>{contact.fName}!</React.Fragment>
}