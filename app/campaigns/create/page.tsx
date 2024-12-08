import AppTopBar from "@/components/app-topbar";

import React from "react";

export default function CreateCampaign() {
  return (
    <>
      <AppTopBar
        breadcrumbs={[
          { title: "Campaigns", link: "/campaigns" },
          { title: "Create", link: "" },
        ]}
      />
    </>
  );
}
