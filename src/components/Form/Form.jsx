import styles from './Form.module.scss';
import { Input, Select, Button } from '../../components';
import { loadCollageList } from '../../services';
import { sendData } from '../../services';
import { useEffect, useState } from 'react';

const Form = ({ studentData }) => {
    const [collageList, setCollageList] = useState(''); //state for collage list

    // i could have maybe put them in one state inside of a object but this is how i did it at the time
    //  const [studentData, setStudentData] = ({
    //      firstName: '',
    //      lastName: '',
    //      email: '',
    //      phone: '',
    //      student_id: '',
    //      birth_date: ''
    //  })
    const [collageValue, setCollageValue] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [phoneValue, setPhone] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');

    //inicial useEffect for inpiuting the data
    useEffect(() => {
        loadCollageList(setCollageList);
    }, []);

    // if there's already student info, checks if the collage_id exists in the table
    useEffect(() => {
        if (studentData) {
            const collageName = collageList.find(
                (element) => element.college_id === studentData.college_id
            )?.name || studentData.college_id;

            //then it sets it in the states
            setCollageValue(collageName || '');
            setFirstName(studentData.first_name || '');
            setLastName(studentData.last_name || '');
            setEmailValue(studentData.email || '');
            setPhone(studentData.phone || '');
            setStudentNumber(studentData.student_number || '');
            setBirthDate(formatToISODate(studentData.birth_date));
        }
    }, [studentData]);

    //format day.month.year -> format year-moth-date
    const formatToISODate = (dateString) => {
        const [day, month, year] = dateString.split('.');
       
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    //URL formatting
    const handleSubmit = (event) => {
        const fields = [collageValue, firstName, lastName, emailValue, phoneValue, studentNumber, birthDate];
        if (fields.some(field => field.trim() === '')) {
            alert('Please fill in all the fields!!!');
            event.preventDefault();
            return;
        }


        const url = '/api/?' + new URLSearchParams({
            action: studentData ? 'update_student' : 'insert_student',
            college_id: collageValue,
            first_name: firstName,
            last_name: lastName,
            email: emailValue,
            phone: phoneValue,
            student_number: studentNumber,
            birth_date: birthDate,
            student_id: studentData?.student_id,
        }).toString();

        sendData(url);
        //console.log('Submitovano:', { college_id: collageValue, first_name: firstName, last_name: lastName, email: emailValue }); -debug code
    };

    // if there's already student data then it's going to forward it as props to Select and Input components
    return (
        <>
            <h2>{studentData ? 'Edit Student' : 'Insert New Student'}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <legend>* All fields are required</legend>
                <div className={styles.taskRow}>
                    <Select
                        options={collageList}
                        label='* Collage:'
                        placeholder='--Select a collage--'
                        value={collageValue}
                        onChange={(option) => setCollageValue(option)}
                    />
                </div>
                <div className={styles.taskRow}>
                    <Input
                        type='text'
                        label='* First Name:'
                        placeholder='John'
                        value={firstName}
                        onChange={(option) => setFirstName(option)}
                    />
                </div>
                <div className={styles.taskRow}>
                    <Input
                        type='text'
                        label='* Last Name:'
                        placeholder='Doe'
                        value={lastName}
                        onChange={(option) => setLastName(option)}
                    />
                </div>
                <div className={styles.taskRow}>
                    <Input
                        type='email'
                        label='* Email:'
                        placeholder='example@gmail.com'
                        value={emailValue}
                        onChange={(option) => setEmailValue(option)}
                    />
                </div>
                <div className={styles.taskRow}>
                    <Input
                        type='tel'
                        label='* Phone:'
                        placeholder='+381 /'
                        value={phoneValue}
                        onChange={(option) => setPhone(option)}
                    />
                </div>
                <div className={styles.taskRow}>
                    <Input
                        type='text'
                        label='* Student Number:'
                        placeholder='5/23'
                        value={studentNumber}
                        onChange={(option) => setStudentNumber(option)}
                    />
                </div>
                <div className={styles.taskRow}>
                    <Input
                        type='date'
                        label='* Birth Date:'
                        placeholder=''
                        value={birthDate}
                        onChange={(option) => setBirthDate(option)}
                    />
                </div>
                <div className={styles.taskRow}>
                    <Button buttonTitle='Submit' success>
                        {studentData ? 'Save changes' : 'Insert'} Student
                    </Button>
                </div>
            </form>
        </>
    );
};

export { Form };
