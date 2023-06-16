import React, { useState } from 'react'
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";
import { NavLink } from 'react-router-dom';


export const ListPersonItem = ({ name, created, id, saveVisit }: any) => {

  return (
    <div>
          <NavLink onClick={() => saveVisit(name)} to={`/person/${id+1}`}>
          <ListItem>
        <div>
          <Typography variant="h6" color="blue-gray">
            {name}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            Created {created.slice(0, 10)}
          </Typography>
        </div>
      </ListItem>
        </NavLink>
      </div>
  )
}
