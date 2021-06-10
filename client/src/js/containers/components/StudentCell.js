import React, { useState, useEffect } from 'react';
import { useStudentsData } from 'js/stores/studentsData';
import { useAddStudentState } from 'js/stores/addStudentState';
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
        //const { id } = e.target;
        //const newStudent = deleteStudent(index, students);
        
       // setStudentsData({ ...studentsData, students: newStudent });
  
       setStudentsData({ ...studentsData, students:students.filter((user => user.id !== id))});
    };
 

    
    const onClickEdit = (e) => {
        const { id } = e.target;
        setEditing(true);
        setAddStudentState({
            ...addStudentState,
            studentName: studentName,
            studentAge: studentAge
        });

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
