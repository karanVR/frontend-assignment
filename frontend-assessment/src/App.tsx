import { useEffect, useState } from 'react'
import './App.css'
import { ProjectDetails, ModalProps } from './models'
import Modal from './components/Modal'
import Table from './components/Table'
import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'

function App() {
  const [projectData, setProjectData] = useState<ProjectDetails[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<ModalProps>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const fetchUserData = async () => {
    const API_URL = 'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json';
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        setModalContent({ title: 'Error', description: response.status, type: 'error' });
        setIsModalOpen(true)
        throw new Error(`status: ${response.status}`);
        
      }
      const data = await response.json();
      console.log(data,'apiData')
      setProjectData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setModalContent({ title: 'Error', description: errorMessage, type: 'error' });
      setIsModalOpen(true);
    }
    finally{
        setTimeout(()=>setIsLoading(false),1000)
    }
  };

  useEffect(()=>{
    fetchUserData()
  },[])

  return (
    <div className='app-wrapper'>
    <Header />
      {isLoading ? <Loader />:<Table data={projectData} />}
      <Footer />
      {isModalOpen && (
        <Modal
          title={modalContent!?.title}
          description={modalContent?.description??"Something went wrong."}
          type={modalContent!?.type}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
    
  )
}

export default App
