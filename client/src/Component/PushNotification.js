import React, { useState, useEffect } from 'react';
import { Card, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';


export const PushNotification = () => {

   const [title, setTitle] = useState('HELLO~');
   const [text, setText] = useState('');
   const [menuList, setMenuList] = useState([]);
   const [selectItem, setSelectItem] = useState();

   useEffect(() => {
      setMenuList(["Both", "ABC", 'XYZ']);
   }, []);

   const menuItemList = () => {
      return menuList.map((menu, key) => 
         <MenuItem key={key} value={key}>{menu}</MenuItem>
      )
   }
   

   const handleSubscribeButton = () => {
      axios.create({
         headers: {
            'Content-Type': 'application/json'
         }
      })
      axios.post('http://localhost:8000/', {
         "topic": 'news',
         "title": title,
         "text": text,
         "selection": selectItem
      })
         .then(function (response) {
            console.log(response);
            response.status()
         })
         .catch(function (error) {
            console.log(error);
         })
   }

   if (menuList.length !== 0) {
      return (
         <div style={{ 
            margin: '-1vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
         }}>

            <Card style={{
            textAlign: 'center',
            backgroundColor: 'lightblue',
            width: '50vw',
            padding: '1.6vw'
            }}>
            <h1 style={{fontSize: '2.5vw'}}>Enter Your Notification!</h1>
               <Box
                  component="form"
                  style={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center'
                  }}
               >
                  <TextField
                     sx={{ m: '1vw', width: '35vw' }}
                     required
                     onChange={(e)=>setTitle(e.target.value)}
                     label='Title'
                  />
                  
                  <TextField
                     sx={{m: '1vw', width: '35vw'}}
                     label="Text"
                     multiline
                     rows={2}
                     onChange={(e)=>setText(e.target.value)}
                     placeholder='Enter your text here.'
                  />

                  <FormControl sx={{m: '1vw', width: '35vw'}}>
                     <InputLabel id="demo-simple-select-label">Age</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectItem}
                        label="Selection"
                        onChange={(e) => { setSelectItem(e.target.value) }}
                     >
                        {
                           menuItemList()
                        }

                     </Select>
                  </FormControl>
                  

                  <Button
                     variant="outlined"
                     sx={{ m: '1vw', width: '35vw' }}
                     onClick={()=>{handleSubscribeButton()}}
                  >
                     Push Notification
                  </Button>

               </Box>
            </Card>
         </div>
      );
   } else {
      return null;
   }
   
}