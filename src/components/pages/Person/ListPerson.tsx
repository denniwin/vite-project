import {useContext, useEffect, useState} from "react";
import {List, Card, Typography, Spinner, Input} from "@material-tailwind/react";
import {ListPersonItem} from "./ListPersonItem";
import {People} from "../../../services/models/People";
import {GetPeople} from "../../../services/API/people.api";
import {PersonContext} from "../../../App";
import useDebouncedFunction from "../../../services/helpers/Debounced";
import LocalStorageDB from "../../../services/helpers/LocalStorageDB";

export default function ListPerson() {
  const [visited, setVisited] = useState<string[]>([]);
  const { personAll, setPersonAll } = useContext(PersonContext);
  const [personSort, setPersonSort] = useState<People[]>(personAll);

  useEffect(() => {
    setVisited(LocalStorageDB.read('viewedPerson'));    
  }, []);

  const saveVisit = (name: string) => {
    if (!visited.includes(name)) {
      const updatedVisited = [...visited, name];
      setVisited(updatedVisited);
      LocalStorageDB.write("viewedPerson", updatedVisited)
    }
  };

  useEffect(() => {

    if (personAll.length === 0) {
      GetPeople()
    .then((peoples) => {
      setPersonAll(peoples);
      setPersonSort(peoples);
    })
    .catch((err) => {
      console.error(err);
    });
}
  }, []);

  const handletextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setPersonSort(
      personAll.filter((item: People) =>
        item.name.toLowerCase().includes(inputText.toLowerCase())
      )
    );
  };

  const debouncedHandletextChange = useDebouncedFunction(
    handletextChange,
    300,
    true
  );

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <div className="w-96 fixed top-20 bg-white z-40">
        <Input
          label="Поиск по ключевым словам"
          className="bg-blue"
          onChange={debouncedHandletextChange}
          id="search"
          labelProps={{htmlFor: "search"}}
        />
      </div>
      {personSort.length === 0 ? (
        <div className="flex flex-col items-center justify-center ">
          <Spinner className="h-12 w-12" />
          <Typography variant="h1">Loading...</Typography>
        </div>
      ) : (
        <div className="mt-16 flex flex-col gap-5">
          <Card className="w-96">
            <List>
              {personSort.map((item, index) => (
                <ListPersonItem
                  saveVisit={saveVisit}
                  key={index}
                  data={item}
                  id={index}
                />
              ))}
            </List>
          </Card>
        </div>
      )}
    </div>
  );
}
