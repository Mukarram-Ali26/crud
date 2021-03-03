import React, { useState, useEffect } from "react"
import { delPost } from './remove';
import { updatePost } from './update';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

let schema = yup.object().shape({
  update: yup.string().required("Please enter something"),
});



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



const All = () => {

  const [fullData, setFullData] = useState([]);
  const [update, setUpdate] = useState({ id: '', message: '' });

  const handleChange = (e) => {
    console.log(e)
    updatePost(e)
  }

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);


  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    console.log("useEffect Called");
    fetch(`/.netlify/functions/all`)
      .then(response => response.json())
      .then(data => {
        setFullData(data)
      });

  }, [fullData]);



  return (
    <div>
      <h3>Crud List</h3>
      { fullData.map((post, ind) => {

        return (

          <div key={ind} className={classes.root}>
              <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <Button onClick={() => (delPost(fullData[ind].ref['@ref'].id))}> <DeleteSharpIcon /> </Button>
            {post.data.detail}
            <Button onClick={() => {
              handleOpen()
              setUpdate({ id: fullData[ind].ref['@ref'].id, message: fullData[ind].data.detail })
            }}> <ThreeSixtyIcon /> </Button>
          </Typography>
        </Toolbar>
      </AppBar>

            

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={modalStyle} className={classes.paper} div key={ind}>
                <h2 id="simple-modal-title">Update</h2>
                <p id="simple-modal-description">

                  
                  <Formik
                    initialValues={{ update: '' }}
                    validationSchema={schema}
                    onSubmit={(values) => {
                      handleChange({ id: update.id, message: values.update })
                      handleClose()

                    }}
                  >
                    {
                      (formik) => (
                        <Form onSubmit={formik.handleSubmit} >
                          <Field as={TextField} defaultValue={update.message} variant='outlined' name='update'  /> <br />
                          <ErrorMessage name="update" />
                          <div style={{ marginTop: '20px' }} >
                            <Button type='submit' color='primary' variant='outlined' > <ThreeSixtyIcon /></Button>
                          </div>
                        </Form>
                      )
                    }

                  </Formik>
                </p>
              </div>
            </Modal>

          </div>
        )
      }
      )}


    </div>
  )


}

export default All


