import React from 'react';
import { Pagination } from "antd" ;
import { Space, Table, Tag } from 'antd';
import type { TableProps , TableColumnsType } from 'antd';
import { useEffect , useState } from 'react';
 const [dataArr , setData] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3000/getData?skip=10&orderBy=first_name&sortIn=desc")
    .then(data => data.json())
    .then((data)=>{
      console.log(data)
      setData(data)
    })
  },[])
const App : React.FC = (()=>{
  
 


  interface DataType {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
      showSorterTooltip: { target: 'full-header' },
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'IP address',
      dataIndex: 'ip_address',
      key: 'ip_address',
    },
    
  ];



  const data: DataType[] = dataArr
  

  const handlePageChange = (page: number, pageSize: number) => {
    console.log(`User clicked on page ${page} with pageSize ${pageSize}`);
  };

  return(
    <>
    <h1>pagination</h1>

    <Table<DataType> columns={columns} dataSource={data} />

    <Pagination
    total={85}
    showSizeChanger
    showQuickJumper
    onChange={handlePageChange}
    showTotal={(total) => `Total ${total} items`}
  />
    </>
  )
})

export default App

const [currentPage , setCurrentPage] = useState(1)
  const [take , setTake] = useState(10)
  const [orderBy , setOrderBy] = useState('id')
  const [sortIn , setSortIn] = useState('asc')
  const [first_name , setFirst_name] = useState('')
