import { useTheme } from '@material-ui/core/styles';
import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';

import Button from '#shared/Button';
import FieldContainer from '#shared/FieldContainer';

const CustomDateInput = forwardRef((props, ref) => {
    const theme = useTheme();

    return <Button
        borderWidth={2}
        color={theme.palette.primaryColor}
        loading={props.disabled}
        onClick={props.onClick}
        width={80}
    >
        {props.value}
    </Button>
});

const DateField = ({
    date,
    disabled,
    label,
    minHeight,
    onChange,
}) => <FieldContainer disabled={disabled} label={label} minHeight={minHeight ? minHeight : 175}>
    <DatePicker
        customInput={<CustomDateInput  />}
        dateFormat='yyyy'
        disabled={disabled}
        onChange={onChange}
        selected={date}
        showYearPicker
    />
</FieldContainer>

export default DateField;