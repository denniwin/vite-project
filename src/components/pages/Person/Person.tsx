import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
  List,
  ListItem,
  Spinner,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import photo from "./img/team-3.jpg";
import { getPeopleById } from "../../API/get-people-by-id";
import { People } from "../../models/People";
import { SwapContext , ThemeContext } from "../../../App";

export default function Person() {
  const navigate = useNavigate();
  const { personAll, setPersonAll } = useContext(ThemeContext)
  
  const goBack = () => {
    navigate("/");
  };

  const [people, setPeople] = useState<People>();

  const { personId } = useParams();

  useEffect(() => {
    if (personId) {
      if (personAll[parseInt(personId)]) {
        setPeople(personAll[parseInt(personId)]);
      }
      else {
        getPeopleById(personId).then((people) => {
          setPeople(people);
        });
      }
    }

  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!people && <Spinner className="h-12 w-12" />}
      {people && (
        <Card className="w-96">
          <CardHeader floated={false} className="h-50">
            <img src={photo} alt="profile-picture" />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {people.name}
            </Typography>
            <Typography color="blue" className="font-medium" textGradient>
              Характеристики
            </Typography>
          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2">
            <List>
              <ListItem>Высота: {people.height}</ListItem>
              <ListItem>Масса: {people.mass}</ListItem>
              <ListItem>
                Цвет глаз:{" "}
                {people.eye_color === "n/a" ? "Не определен" : people.eye_color}
              </ListItem>
              <ListItem>
                Гендер:{" "}
                {people.gender === "n/a" ? "Не определен" : people.gender}
              </ListItem>
              <ListItem>
                Цвет волос:{" "}
                {people.hair_color === "n/a"
                  ? "Не определен"
                  : people.hair_color}
              </ListItem>
              <ListItem>Цвет одежды: {people.skin_color}</ListItem>
            </List>
          </CardFooter>
          <Button
            onClick={goBack}
            color="green"
            className="w-[80%] mx-auto mb-6"
          >
            Back
          </Button>
        </Card>
      )}
    </div>
  );
}
