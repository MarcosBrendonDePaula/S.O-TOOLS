import React, { FC } from 'react';
import { Badge, Button } from 'react-bootstrap';
import './Stack.css';
interface StackProps {}


const Stack: FC<StackProps> = () => (
   <div>
      <h1>
         Example headinghttps://react-bootstrap.netlify.app/docs/getting-started/introduction#browser-support
         <Badge bg="secondary" as={Button}>
            New
         </Badge>
      </h1>
   </div>
);

export default Stack;
