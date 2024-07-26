import AddSalesOrder from "@/components/shared/AddSalesOrder";
import CreateSalesOrder from "@/components/shared/CreateSalesOrder";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { useState } from "react";

const CreateSalesOrderPage = () => {
  const [tabvalue, setTabvalue] = useState<string>("create");
  return (
    <div className="">
      <Tabs value={tabvalue} defaultValue="create">
        <TabsContent value="create" className="p-0 m-0">
          <CreateSalesOrder setTab={setTabvalue} />
        </TabsContent>
        <TabsContent value="add" className="p-0 m-0">
          <AddSalesOrder setTab={setTabvalue} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateSalesOrderPage;
