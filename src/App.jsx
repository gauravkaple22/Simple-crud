import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentTable from './StudentTable'
import CreateStudent from './CreateStudent'
import EditStudent from './EditStudent'
import ViewStudentDetails from './ViewStudentDetails'
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StudentTable />} ></Route>
        <Route path='/student/create' element={<CreateStudent />} ></Route>
        <Route path='/student/edit/:studentId' element={<EditStudent />} ></Route>
        <Route path='/student/view/:studentId' element={<ViewStudentDetails />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
