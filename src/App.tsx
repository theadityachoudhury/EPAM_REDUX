import { Route, Routes } from 'react-router';
import './App.css'
import Courses from './components/Courses/Courses'
import Header from './components/Header/Header'
import CourseInfo from './components/CourseInfo/CourseInfo';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setLoadingAction } from './store/courses/actions';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { fetchUser } from './store/user/thunk';
import { AppDispatch } from './store';
import { fetchCourses } from './store/courses/thunk';
import { fetchAuthors } from './store/authors/thunk';
import AddCourse from './components/AddCourse/AddCourse';
import UpdateCourse from './components/UpdateCourse/UpdateCourse';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchAuthors());
    dispatch(setLoadingAction(false));
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUser(token));
    }
  }, []);
  return (
    <div className='m-auto'>
      <Header />
      <div className=''>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/' element={<Courses />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/course/:courseId' element={<CourseInfo />} />
          <Route path='/courses/add' element={<PrivateRoute>
            <AddCourse />
          </PrivateRoute>} />
          <Route path='/courses/update/:id' element={<PrivateRoute>
            <UpdateCourse />
          </PrivateRoute>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
