import React, { useState, useEffect } from 'react';
import { useStudentsData } from 'js/stores/studentsData';
import { useAddStudentState } from 'js/stores/addStudentState';
import { useAdminState } from '../../stores/adminState';
import { useErrorState } from 'js/stores/errorState';
import 'sass/app.css';
import 'sass/student.css'; 
import 'antd/dist/antd.css';

import { Button } from 'antd';
import { Input } from 'antd';

const StudentCell = (props) => {

    const { id, studentName, studentAge } = props;
    const [studentsData, setStudentsData] = useStudentsData();

    const { students } = studentsData;
    const [addStudentState, setAddStudentState] = useAddStudentState();
    const [editing, setEditing] = useState(false);

    const [beforeEdit, setBeforeEdit] = useState();
    const [newAddStudentState, setNewAddStudentState] = useState({
        studentName: studentName,
        studentAge: studentAge
    });
    const [adminState,setAdminState] = useAdminState();
	const [errorState, setErrorState] = useErrorState();

    useEffect(
        () => {
            const { studentName, studentAge } = addStudentState;
            //setNewAddStudentState({ studentName, studentAge});
            if (editing) {
                setBeforeEdit({ studentName, studentAge });
            }
        },
        [studentsData, editing]
    )

    const onClickDelete = () => {
        if(!adminState){
			setErrorState({
				...errorState,
				active: true,
				mode: 'fail',
				message: [['삭제하려면 관리자 계정으로 로그인 하세요.']]
            });
        }
        if(adminState){
            setStudentsData({ ...studentsData, students:students.filter((user => user.id !== id))});
        }
    };
 

    
    const onClickEdit = (e) => {
        if(!adminState){
			setErrorState({
				...errorState,
				active: true,
				mode: 'fail',
				message: [['삭제하려면 관리자 계정으로 로그인 하세요.']]
            });
        }
        if(adminState){
            const { id } = e.target;
            setEditing(true);
            setAddStudentState({
                ...addStudentState,
                studentName: studentName,
                studentAge: studentAge
            });
        }
    };
    const onClickEditDone = () => {
            setEditing(false);

            setStudentsData( a => ({
           
                students:a.students.map(students =>
                    students.studentName === studentName ? 
                    { ...students, studentName: newAddStudentState.studentName, 
                        studentAge: newAddStudentState.studentAge} : students)
            }))
        
    };

    const onChangeInput = (e) => {
        const { id, value } = e.target;
        if (id ==='input-update-name'){
            //setSstudentName(value)
            setNewAddStudentState({ ...newAddStudentState, studentName: value });
        } else if(id ==='input-update-age'){
            setNewAddStudentState({ ...newAddStudentState, studentAge: value });
        }
    };
    
    return (
        <tr>
            {editing ?
            <>
                <td><Input id = "input-update-name" value={newAddStudentState.studentName} onChange={onChangeInput}/></td>
                <td><Input id = "input-update-age" value={newAddStudentState.studentAge} onChange={onChangeInput} /></td>
                <td><Button onClick={onClickEditDone}>적용</Button></td>
               

                <td><Button onClick={onClickDelete}>삭제</Button></td>
            </>:
            <>
                <td>{newAddStudentState.studentName}</td>
                <td>{newAddStudentState.studentAge}</td>
                <td><Button onClick={onClickEdit}>수정</Button></td>
                <td><Button onClick={onClickDelete}>삭제</Button></td>
            </>}
        </tr>


    )
};

export default StudentCell;
