import React, { useState, useEffect, useRef }  from 'react';
import { useStudentsData } from 'js/stores/studentsData';
import { useAddStudentState } from 'js/stores/addStudentState';
import StudentCell from './StudentCell';

const StudentsControl = () => {
    const [studentsData, setStudentsData] = useStudentsData();
    const { students } = studentsData;
    const [addStudentState, setAddStudentState] = useAddStudentState();
    const [newAddStudentState, setNewAddStudentState] = useState({
        id: '',
        studentName: '',
        studentAge: ''
    });
    const { studentName, studentAge } = newAddStudentState;
    const nameInput = useRef();//추가후에 커서를 학생에 두기 위해서 
   
   let id;
   

   

    useEffect(
        () => {
            const { studentName, studentAge } = addStudentState;
            setNewAddStudentState({ studentName, studentAge });
           // nextId = students[students.length-1].id +1;
           // console.log(nextId);
           
        },
        [ studentsData ] 
    )

    const onChangeStudent = (e) => {
        const { id, value } = e.target;
        if (id ==='input-name'){
            setNewAddStudentState({ ...newAddStudentState, studentName: value });
        } else if(id ==='input-age'){
            setNewAddStudentState({ ...newAddStudentState, studentAge: value });
        }
        //setNewAddStudentState({ ...newAddStudentState, studentName: value });
    };

  

    const onClickAdd = () => {
        
        if(studentName === '') return;
        console.log(newAddStudentState);
        const newStudent = insertStudent(newAddStudentState, students);

        if(newStudent !== false) {
            setStudentsData({ ...studentsData, students: newStudent})
            console.log(studentsData);
        }    
        nameInput.current.focus();
    }
    const onKeyDownEnter = (e) => {
        if(e.key === 'Enter'){
            onClickAdd();
        }
    }

    const insertStudent = (addStudentState, students) => {
        const { studentName, studentAge } = addStudentState;
        let index;

        if(students.length === 0) id = 0;
        else{
            id=students[students.length-1].id +1;
        }
        if (students.length === 0) {
            index = 0
        } else {
            index = students.length-1;//students배열의 마지막 인덱스
        }
        
        if (index !== -1) {
            const newItem = {id, studentName, studentAge };
            return [...students.slice(0, index+1), newItem ];
        } else {
            return false;
        }

    }

  


    return (
        
        <div id="student-view">
            <table id ="student-table">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>나이</th>
                        <th>
                        <input id = "input-name" value={studentName||''} onChange={onChangeStudent} ref={nameInput}/>
                        <input id = "input-age" type='number' value={studentAge||''}onChange={onChangeStudent} onKeyPress={onKeyDownEnter} />
                        <button onClick={onClickAdd} >추가</button>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((a, i) => (
                        <StudentCell
                            key = {a.id}
                            id = {a.id}
                            studentName = {a.studentName}
                            studentAge = {a.studentAge}
                            />
                            
                    ))}


           
                </tbody>
            </table>
          
        </div>
        
    )
};

export default StudentsControl;
