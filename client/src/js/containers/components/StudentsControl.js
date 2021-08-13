import React, { useState, useRef } from 'react';
import { useStudentsData } from 'js/stores/studentsData';
import { useAdminState } from '../../stores/adminState';
import StudentCell from './StudentCell';
import 'antd/dist/antd.css';
import 'sass/student.css'; 
import { Button } from 'antd';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const StudentsControl = () => {
    const [studentsData, setStudentsData] = useStudentsData();
    const { students } = studentsData;
    const [newAddStudentState, setNewAddStudentState] = useState({
        id: '',
        studentName: '',
        studentAge: ''
    });
    const [adminState,setAdminState] = useAdminState();
    const { studentName, studentAge } = newAddStudentState;
    const nameInput = useRef();//추가후에 커서를 학생에 두기 위해서 

    let id;

    const onChangeStudent = (e) => {
        const { id, value } = e.target;
        if (id === 'input-insert-name') {
            setNewAddStudentState({ ...newAddStudentState, studentName: value });
        } else if (id === 'input-insert-age') {
            setNewAddStudentState({ ...newAddStudentState, studentAge: value });
        }
        
    };



    const onClickAdd = () => {

        if (studentName === '') return;

        const newStudent = insertStudent(newAddStudentState, students);
      
  
        if (newStudent !== false) {
            setStudentsData({ ...studentsData, students: newStudent })

        }

        nameInput.current.focus();

        setNewAddStudentState({
            studentName: '',
            studentAge: ''
        });

    }

    const onKeyDownEnter = (e) => {
        if (e.key === 'Enter') {
            onClickAdd();
        }
    }

    const insertStudent = (addStudentState, students) => {
        const { studentName, studentAge } = addStudentState;
        let index;
        id = uuidv4();//랜덤 id생성
        if (students.length === 0) {
            index = 0
        } else {
            index = students.length - 1;//students배열의 마지막 인덱스
        }

        if (index !== -1) {
            const newItem = { id, studentName, studentAge };
            return [...students.slice(0, index + 1), newItem];
        } else {
            return false;
        }

    }




    return (

        <div id="student-view">
            <table id="student-table">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>나이</th>
                        { adminState ?
                        <>
                        <th>
                            <Input id="input-insert-name" style={{width:'90px'}}placeholder="이름" value={studentName || ''} onChange={onChangeStudent} ref={nameInput} prefix={<UserOutlined />}/>
                            <Input id="input-insert-age" placeholder="나이" type='number' value={studentAge || ''} onChange={onChangeStudent} onKeyPress={onKeyDownEnter} />
                        </th>
                        <th>
                            <Button onClick={onClickAdd} >추가</Button>
                        </th></> : <><th></th><th></th></>}
                    </tr>
                </thead>
                <tbody>
                    {students.map((a, i) => (
                        <StudentCell
                            key={a.id}
                            id={a.id}
                            studentName={a.studentName}
                            studentAge={a.studentAge}
                        />

                    ))}



                </tbody>
            </table>

        </div>

    )
};

export default StudentsControl;
