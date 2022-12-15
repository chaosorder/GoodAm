import React, { useRef } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickerMemoized = React.memo(props => <DateTimePicker {...props} />);

const CustomTimerPicker = ({ value, ...props }) => {
    const initial = useRef(value);

    return <DateTimePickerMemoized
        value={initial.current}
        {...props}
    />;
};

export default CustomTimerPicker;