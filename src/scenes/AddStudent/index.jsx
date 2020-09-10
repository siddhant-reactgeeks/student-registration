import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createPlayerAction } from '../../actions/createStudent'
import { genderOptions, initialState, countryCodes } from './constants';
import { MenuItem, Avatar  } from '@material-ui/core';
import Validator from '../../utils/validator'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ImageUploader from "react-images-upload";
import uuid from 'react-uuid'
import './index.css'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  },
}));

const CreatePlayer = (props) => {
  const [errorMsgs, setErrorMsgs] = React.useState(initialState)
  const [formData, setFormData] = React.useState(initialState);
  const [success, setSuccess] = React.useState(false);

  const isInitial = React.useRef(true)
  const { 
    profileImages,
    firstName,
    lastName,
    fatherName,
    email,
    address,
    mobileNumber,
    gender,
    dob,
    country } = formData
  const classes = useStyles();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData(formData => { return { ...formData, [id]: value } })
  };
  const handleSelectChange = (event, field) => {
    setFormData(formData => { return { ...formData, [field]: event.target.value } })
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    isInitial.current = false;
    const validate = _isValid();
    const { isValid, errors } = validate;
    setErrorMsgs(errors);
    if (isValid) {
      props.createPlayerAction({
        profileImages,
        firstName,
        lastName,
        fatherName,
        email,
        address,
        mobileNumber,
        gender,
        dob,
        country,
        id: uuid(),
      })
      setSuccess(true)
      setErrorMsgs(initialState)
      setFormData(initialState)
    }
  }

  React.useEffect(() => {
    if (success) {
      setTimeout(
        () => setSuccess(false),
        6000
      )
    }
  }, [success])

  const _isValid = (field = null) => {
    const validate = Validator.createValidator(
      {
        firstName: ["required"],
        lastName: ["required"],
        profileImages: ["required"],
        fatherName: ["required"],
        email: ["required", "email"],
        address: ["required"],
        mobileNumber: ["required"],
        gender: ["required"],
        dob: ["required"],
        country: ["required"],
      },
      {
        firstName,
        lastName,
        profileImages: profileImages.length > 0 ? 'valid' : '',
        fatherName,
        email,
        address,
        mobileNumber,
        gender,
        dob,
        country: country.length > 0 ? 'valid' : '',
      },
      field,
      {
        firstName: "First Name",
        lastName: "Last Name",
        height: "Height",
        profileImages: "Image",
      }
    );

    return validate;
  };
  
  const onDrop = (pictureFiles) => {
    setFormData(formData => { return { ...formData, profileImages: [...formData.profileImages, ...pictureFiles] } })
  }

  return (
    <form className={classes.root} autoComplete="off">
      <div className="create-player-container">
        <div>
          <ImageUploader
            withIcon={true}
            buttonText="Choose Profile Image"
            onChange={onDrop}
            imgExtension={[".jpg",".jpeg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
      <div className="d-flex">
        {profileImages.map((image) =>  {
          const url = URL.createObjectURL(image);
          return  <Avatar alt="Profile Image" src={url} className={classes.large} />
        })}
        </div>
      </div>
        <TextField
          onChange={handleChange}
          error={errorMsgs.firstName && errorMsgs.firstName.length > 0 && !isInitial.current}
          required
          value={firstName}
          id="firstName"
          label={errorMsgs.firstName && errorMsgs.firstName.length > 0 && !isInitial.current ? errorMsgs.firstName : "First Name"}
          defaultValue="" />
        <TextField
          onChange={handleChange}
          error={errorMsgs.lastName && errorMsgs.lastName.length > 0 && !isInitial.current}
          required
          value={lastName}
          id="lastName"
          label={errorMsgs.lastName && errorMsgs.lastName.length > 0 && !isInitial.current ? errorMsgs.lastName : "Last Name"}
          defaultValue="" />
          <TextField
            onChange={handleChange}
            error={errorMsgs.fatherName && errorMsgs.fatherName.length > 0 && !isInitial.current}
            required
            value={fatherName}
            id="fatherName"
            label={errorMsgs.fatherName && errorMsgs.fatherName.length > 0 && !isInitial.current ? errorMsgs.fatherName : "Father's Name"}
            defaultValue="" />
            <TextField
              onChange={handleChange}
              error={errorMsgs.email && errorMsgs.email.length > 0 && !isInitial.current}
              required
              value={email}
              type="email"
              id="email"
              label={errorMsgs.email && errorMsgs.email.length > 0 && !isInitial.current ? errorMsgs.email : "Email"}
              defaultValue="" />
              <TextField
                onChange={handleChange}
                error={errorMsgs.address && errorMsgs.address.length > 0 && !isInitial.current}
                required
                value={address}
                id="address"
                label={errorMsgs.address && errorMsgs.address.length > 0 && !isInitial.current ? errorMsgs.address : "Address"}
                defaultValue="" />
                <TextField
                  onChange={handleChange}
                  error={errorMsgs.mobileNumber && errorMsgs.mobileNumber.length > 0 && !isInitial.current}
                  required
                  value={mobileNumber}
                  type="number"
                  id="mobileNumber"
                  label={errorMsgs.mobileNumber && errorMsgs.mobileNumber.length > 0 && !isInitial.current ? errorMsgs.mobileNumber : "Mobile Number"}
                  defaultValue="" />
                  <TextField
                    onChange={handleChange}
                    error={errorMsgs.dob && errorMsgs.dob.length > 0 && !isInitial.current}
                    required
                    value={dob}
                    id="dob"
                    type="date"
                    // label={errorMsgs.dob && errorMsgs.dob.length > 0 && !isInitial.current ? errorMsgs.dob : "DOB"}
                    defaultValue="" />
        <TextField 
          name="Gender"
          select
          error={errorMsgs.gender && errorMsgs.gender.length > 0 && !isInitial.current}
          label={errorMsgs.gender && errorMsgs.gender.length > 0 && !isInitial.current ? errorMsgs.gender : "Position"}
          required
          value={gender}
          onChange={(e) => handleSelectChange(e, 'gender')}
        >
          {genderOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} 
        </TextField>
        
        <TextField 
          name="Country"
          select
          error={errorMsgs.country && errorMsgs.country.length > 0 && !isInitial.current}
          label={errorMsgs.country && errorMsgs.country.length > 0 && !isInitial.current ? errorMsgs.country : "Country"}
          required
        
          value={country}
          onChange={(e) => handleSelectChange(e, 'country')}
        >
          {countryCodes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} 
        </TextField>
      </div>

      <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
        Save
      </Button>

      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Student Added Successfully!
        </Alert>
      </Snackbar>
    </form>
  );
}


const mapStateToProps = (state) => ({
  state: state
});
const mapDispatchToProps = (dispatch) => ({
  createPlayerAction: (playerData) => dispatch(createPlayerAction(playerData))
});

const CreatePlayerContainer =
  connect(mapStateToProps, mapDispatchToProps)(CreatePlayer)

export default CreatePlayerContainer;