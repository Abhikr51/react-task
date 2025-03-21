import { GridItem, FormField, FormFieldLabel, GridLayout, Input, Panel, FlexLayout, FlexItem, StackLayout, Text, FormFieldHelperText } from '@salt-ds/core';
import { useState } from 'react';

const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePhoneNumber = (phone: string) => {
    const re = /^\d{10}$/; // Updated regex to check for exactly 10 digits
    return re.test(phone);
};

const PersonalDetails = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: "",
        emailId: "",
        phoneCode: "",
        phoneNumber: "",
    });

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        emailId: false,
        phoneCode: false,
        phoneNumber: false,
    });

    const onChangeFormData = (key: string, value: any) => {
        setFormData({
            ...formData,
            [key]: value
        });
    };

    const onBlurField = (key: string) => {
        setTouched({
            ...touched,
            [key]: true
        });
    };

    const getValidationStatus = (key: keyof typeof touched) => {
        if (!touched[key]) return undefined;
        if (key === 'emailId' && !validateEmail(formData.emailId)) return 'error';
        if (key === 'phoneNumber' && !validatePhoneNumber(formData.phoneNumber)) return 'error';
        if (key === 'phoneCode' && !validatePhoneNumber(formData.phoneCode)) return 'error';
        return formData[key] ? 'success' : 'error';
    };

    const getHelperText = (key: keyof typeof touched) => {
        if (!touched[key]) return '';
        if (key === 'emailId' && !validateEmail(formData.emailId)) return 'Invalid email format';
        if (key === 'phoneNumber' && !validatePhoneNumber(formData.phoneNumber)) return 'Phone number should be 10 digits only';
        if (key === 'phoneCode' && !validatePhoneNumber(formData.phoneCode)) return 'Phone code should be digits only';
        return '';
    };

    return (
        <Panel variant='tertiary' >
            <GridLayout columns={{ xs: 1, sm: 2, lg: 5, md: 3, xl: 6 }}>
                <GridItem>
                    <FormField necessity="asterisk" validationStatus={getValidationStatus('firstName')}>
                        <FormFieldLabel>First Name</FormFieldLabel>
                        <Input placeholder="Enter..." value={formData.firstName} onChange={(e: any) => onChangeFormData('firstName', e.target.value)} onBlur={() => onBlurField('firstName')} />
                        <FormFieldHelperText>{getHelperText('firstName')}</FormFieldHelperText>
                    </FormField>
                </GridItem>
                <GridItem>
                    <FormField necessity="optional" validationStatus={formData.middleName ? 'success' : undefined}>
                        <FormFieldLabel>Middle Name</FormFieldLabel>
                        <Input placeholder="Enter..." value={formData.middleName} onChange={(e: any) => onChangeFormData('middleName', e.target.value)} onBlur={() => onBlurField('middleName')} />
                        {/* <FormFieldHelperText>{getHelperText('middleName')}</FormFieldHelperText> */}
                    </FormField>
                </GridItem>
                <GridItem>
                    <FormField necessity="asterisk" validationStatus={getValidationStatus('lastName')}>
                        <FormFieldLabel>Last Name</FormFieldLabel>
                        <Input placeholder="Enter..." value={formData.lastName} onChange={(e: any) => onChangeFormData('lastName', e.target.value)} onBlur={() => onBlurField('lastName')} />
                        <FormFieldHelperText>{getHelperText('lastName')}</FormFieldHelperText>
                    </FormField>
                </GridItem>
                <GridItem>
                    <FormField necessity="asterisk" validationStatus={getValidationStatus('emailId')}>
                        <FormFieldLabel>Email Id</FormFieldLabel>
                        <Input placeholder="Enter..." value={formData.emailId} onChange={(e: any) => onChangeFormData('emailId', e.target.value)} onBlur={() => onBlurField('emailId')} />
                        <FormFieldHelperText>{getHelperText('emailId')}</FormFieldHelperText>
                    </FormField>
                </GridItem>
                <GridItem>
                    <FormField necessity="asterisk" validationStatus={getValidationStatus('phoneNumber')}>
                        <FormFieldLabel>Phone Number</FormFieldLabel>
                        <FlexLayout>
                            <FlexLayout gap={1} align='center' style={{width : 50}}>
                                <FlexItem>
                                    <Text >+</Text>
                                </FlexItem>
                                <FlexItem>
                                    <Input textAlign='center' placeholder="91" value={formData.phoneCode} onChange={(e: any) => onChangeFormData('phoneCode', e.target.value)} onBlur={() => onBlurField('phoneCode')} />
                                </FlexItem>
                            </FlexLayout>
                            <FlexItem grow={1}>
                                <Input placeholder="Enter..." value={formData.phoneNumber} onChange={(e: any) => onChangeFormData('phoneNumber', e.target.value)} onBlur={() => onBlurField('phoneNumber')} />
                            </FlexItem>
                        </FlexLayout>
                        <FormFieldHelperText>{getHelperText('phoneNumber')}</FormFieldHelperText>
                    </FormField>
                </GridItem>
            </GridLayout>
        </Panel>
    )
}





export default PersonalDetails