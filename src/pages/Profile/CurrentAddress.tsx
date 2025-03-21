import { GridItem, FormField, FormFieldLabel, GridLayout, Input, Panel, FormFieldHelperText } from '@salt-ds/core';
import { useState } from 'react';

type TouchState = {
    streetAddress: boolean;
    city: boolean;
    state: boolean;
    zipCode: boolean;
    country: boolean;
};

const validateZipCode = (zip: string) => {
    const re = /^\d+$/;
    return re.test(zip);
};

const CurrentAddress = () => {

    const [formData, setFormData] = useState({
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    const [touched, setTouched] = useState<TouchState>({
        streetAddress: false,
        city: false,
        state: false,
        zipCode: false,
        country: false,
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

    const getValidationStatus = (key: keyof TouchState) => {
        if (!touched[key]) return undefined;
        if (key === 'zipCode' && !validateZipCode(formData.zipCode)) return 'error';
        return formData[key] ? 'success' : 'error';
    };

    const getHelperText = (key: keyof TouchState) => {
        if (!touched[key]) return '';
        if (key === 'zipCode' && !validateZipCode(formData.zipCode)) return 'Zip code should be digits only';
        return '';
    };

    return (
        <Panel variant='tertiary' >
            <GridLayout columns={{ xs: 1, sm: 2, lg: 5, md: 3, xl: 6 }}>
                <GridItem >
                    <FormField necessity="asterisk" validationStatus={getValidationStatus('streetAddress')}>
                        <FormFieldLabel>Street Address</FormFieldLabel>
                        <Input placeholder="Enter..." value={formData.streetAddress} onChange={(e: any) => onChangeFormData('streetAddress', e.target.value)} onBlur={() => onBlurField('streetAddress')} />
                        <FormFieldHelperText>{getHelperText('streetAddress')}</FormFieldHelperText>
                    </FormField>
                </GridItem>
                <GridItem >
                    <FormField necessity="asterisk" validationStatus={getValidationStatus('city')}>
                        <FormFieldLabel>City</FormFieldLabel>
                        <Input placeholder="Enter..." value={formData.city} onChange={(e: any) => onChangeFormData('city', e.target.value)} onBlur={() => onBlurField('city')} />
                        <FormFieldHelperText>{getHelperText('city')}</FormFieldHelperText>
                    </FormField>
                </GridItem>
                <GridItem >
                    <FormField necessity="asterisk" validationStatus={getValidationStatus('state')}>
                        <FormFieldLabel>State</FormFieldLabel>
                        <Input placeholder="Enter..." value={formData.state} onChange={(e: any) => onChangeFormData('state', e.target.value)} onBlur={() => onBlurField('state')} />
                        <FormFieldHelperText>{getHelperText('state')}</FormFieldHelperText>
                    </FormField>
                </GridItem>
                <GridItem >
                    <FormField necessity="asterisk" validationStatus={getValidationStatus('zipCode')}>
                        <FormFieldLabel>Zip Code</FormFieldLabel>
                        <Input placeholder="Enter..." value={formData.zipCode} onChange={(e: any) => onChangeFormData('zipCode', e.target.value)} onBlur={() => onBlurField('zipCode')} />
                        <FormFieldHelperText>{getHelperText('zipCode')}</FormFieldHelperText>
                    </FormField>
                </GridItem>
                <GridItem >
                    <FormField necessity="asterisk" validationStatus={getValidationStatus('country')}>
                        <FormFieldLabel>Country</FormFieldLabel>
                        <Input placeholder="Enter..." value={formData.country} onChange={(e: any) => onChangeFormData('country', e.target.value)} onBlur={() => onBlurField('country')} />
                        <FormFieldHelperText>{getHelperText('country')}</FormFieldHelperText>
                    </FormField>
                </GridItem>
            </GridLayout>
        </Panel>
    )
}

export default CurrentAddress