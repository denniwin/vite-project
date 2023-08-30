import {
  Card,
  List,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import LocalStorageDB from "../../../services/helpers/LocalStorageDB";

const ViewedPerson = () => {
  const [viewedPerson, setViewedPerson] = useState<string[]>([]);

  useEffect(() => {
      setViewedPerson(LocalStorageDB.read('viewedPerson'));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {viewedPerson.length === 0 ? (
        <div className="flex flex-col items-center justify-center ">
          <Typography variant="h1">Нет просмотренных</Typography>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <Card className="w-96">
            <List>
              {viewedPerson.map((item, index) => (
                <Typography
                  key={index}
                  variant="h4"
                  className=" hover:text-green-300 mb-3 text-center cursor-default"
                >
                  {item}
                </Typography>
              ))}
            </List>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ViewedPerson;
