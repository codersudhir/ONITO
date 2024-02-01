// src/UserForm.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Stepper, Step, StepLabel, MenuItem, Select } from '@material-ui/core';
import { object, string, number } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//import DataTable from 'react-data-table-component';
import { setStep, setFirstName, setLastName, setEmail, setAge, setSex, setMobile, setGovtIdType, setGovtId, setAddress, setState, setCity, setCountry, setPincode, resetUser } from './store/userSlice';
import DataTable, { TableColumn } from 'react-data-table-component';

const schema = object({
  firstName: string().required('First Name is required').min(3, 'Minimum 3 characters'),
  lastName: string().required('Last Name is required'),
  email: string().email('Invalid email').required('Email is required'),
  age: number().positive('Age must be a positive integer').required('Age is required'),
  sex: string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid option'),
  mobile: string().required('Mobile is required').matches(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  govtIdType: string().required('Government ID Type is required').oneOf(['Aadhar', 'PAN'], 'Invalid option'),
  govtId: string(),
  address: string().optional(),
  state: string().optional(),
  city: string().optional(),
  country: string().optional(),
  pincode: string().matches(/^\d+$/, 'Invalid pincode').optional(),
});

const addressSchema = object({
  address: string().optional(),
  state: string().optional(),
  city: string().optional(),
  country: string().optional(),
  pincode: string().matches(/^\d+$/, 'Invalid pincode').optional(),
});

const columns = [
  { name: 'FirstName', selector: (row:any) => row.firstName, sortable: true },
  { name: 'LastName', selector: (row:any) => row.lastName, sortable: true },
  { name: 'Email', selector: (row:any) => row.email, sortable: true },
  { name: 'Age', selector: (row:any) => row.age, sortable: true },
  { name: 'Sex', selector: (row:any) => row.sex, sortable: true },
  { name: 'Mobile', selector: (row:any) => row.mobile, sortable: true },
  { name: 'GovtIdType', selector: (row:any) => row.govtIdType, sortable: true },
  { name: 'GovtId', selector: (row:any) => row.govtId, sortable: true },
  { name: 'Address', selector: (row:any) => row.address, sortable: true },
  { name: 'State', selector: (row:any) => row.state, sortable: true },
  { name: 'City', selector: (row:any) => row.city, sortable: true },
  { name: 'Country', selector: (row:any) => row.country, sortable: true },
  { name: 'Pincode', selector: (row:any) => row.pincode, sortable: true },
];

const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const { step, ...userData } = useSelector((state:any) => state.user);
  const [countries, setCountries] = useState<string[]>([]);
  const { control, handleSubmit, formState, setError, setValue } = useForm({
    resolver: yupResolver(schema),
  });
console.log("data",userData);

  const onSubmit = (data: any) => {
    if (step === 1) {
      dispatch(setFirstName(data.firstName));
      dispatch(setLastName(data.lastName));
      dispatch(setEmail(data.email));
      dispatch(setAge(data.age));
      dispatch(setSex(data.sex));
      dispatch(setMobile(data.mobile));
      dispatch(setGovtIdType(data.govtIdType));
      dispatch(setGovtId(data.govtId));
      dispatch(setStep(2));
    } else {
      // Validate Step-2 fields
       addressSchema.validate(data, { abortEarly: false }).then(() => {
        // Validation successful, dispatch actions for Step-2 fields
        dispatch(setAddress(data.address));
        dispatch(setState(data.state));
        dispatch(setCity(data.city));
        dispatch(setCountry(data.country));
        dispatch(setPincode(data.pincode));
        // Additional logic for submitting the form data
        // Save the submitted user in Redux
        // Automatically display the new row in the Datatable
      }).catch((validationErrors) => {
        // Validation failed for Step-2 fields, display errors
        validationErrors.inner.forEach((error:any) => {
          setError(error.path as any, { type: 'manual', message: error.message });
        });
      });
    }
  };

  const handleCountryChange = async (value: string) => {
    // Fetch countries from the provided API based on the user's input
    try {
      const response = await fetch(`https://restcountries.com/v3/name/${value}`);
      const data = await response.json();
      const countryNames = data.map((country: any) => country.name.common);
      setCountries(countryNames);
      console.log(countryNames);
      
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleReset = () => {
    // Reset the user state when the form is reset
    dispatch(resetUser());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
      <Stepper activeStep={step - 1}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
      </Stepper>

      {step === 1 && (
        <>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="First Name" />}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Last Name" />}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Email" />}
          />
          <Controller
            name="age"
            control={control}
            render={({ field }) => <TextField {...field} type="number" label="Age" />}
          />
          <Controller
            name="sex"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Sex">
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            )}
          />
          <Controller
            name="mobile"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Mobile" />}
          />
          <Controller
            name="govtIdType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Government ID Type">
                <MenuItem value="Aadhar">Aadhar</MenuItem>
                <MenuItem value="PAN">PAN</MenuItem>
              </Select>
            )}
          />
          <Controller
            name="govtId"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Government ID" />}
          />
        </>
      )}

{step === 2 && (
  <>
    <Controller
      name="address"  // Make sure this matches the field name in your Yup schema
      control={control}
      defaultValue=""
      render={({ field }) => <TextField {...field} label="Address" />}
    />
    <Controller
      name="state"  // Make sure this matches the field name in your Yup schema
      control={control}
      defaultValue=""
      render={({ field }) => <TextField {...field} label="State" />}
    />
    <Controller
      name="city"  // Make sure this matches the field name in your Yup schema
      control={control}
      defaultValue=""
      render={({ field }) => <TextField {...field} label="City" />}
    />
    <input type="text" placeholder='input contry name here ' onChange={(e)=>handleCountryChange(e.target.value)} />
    <Controller
      name="country"  // Make sure this matches the field name in your Yup schema
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          label="Country"
          onChange={(e) => {
            handleCountryChange(e.target.value);
            setValue('country', e.target.value);
          }}
          select
        >
          {countries.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
    <Controller
      name="pincode"  // Make sure this matches the field name in your Yup schema
      control={control}
      defaultValue=""
      render={({ field }) => <TextField {...field} label="Pincode" />}
    />
  </>
)}

      <Button type="submit" variant="contained" color="primary">
        {step === 1 ? 'Next' : 'Submit'}
      </Button>
      <Button type="reset" variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
        Reset
      </Button>

      <DataTable
        title="Submitted Users"
        columns={columns}
        data={[userData]}
        pagination
      />
    </form>
  );
};

export default UserForm;
