import React, {useState} from "react";
import {
  ListItem,
  Typography,
} from "@material-tailwind/react";
import {NavLink} from "react-router-dom";
import {People} from "../../../services/models/People";

export const ListPersonItem = ({
  data,
  id,
  saveVisit,
}: {
  data: People;
  id: number;
  saveVisit: (name: string) => void;
  }) => {
  
  return (
    <div>
      <NavLink onClick={() => { saveVisit(data.name)}} to={`/person/${id}`}>
        <ListItem>
          <div>
            <Typography variant="h6" color="blue-gray">
              {data.name}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Created {data.created.slice(0, 10)}
            </Typography>
          </div>
        </ListItem>
      </NavLink>
    </div>
  );
};
