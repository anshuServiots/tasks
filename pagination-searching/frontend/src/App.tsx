import React, { useState , useEffect } from 'react';
import type { TableColumnsType, TableProps , Input } from 'antd';
import { Button, Space, Table } from 'antd';
import { getData } from './helper/functions';
import { FilterValue } from 'antd/es/table/interface';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}



const App: React.FC = () => {

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [dataArr , setData] = useState([])
  const data: DataType[] = dataArr;

  const [dataCount , setDataCount] = useState(1000)
  const [pageCount , setPageCount] = useState(10)

  const [currentPage , setCurrentPage] = useState(1)
  const [take , setTake] = useState(10)
  const [orderBy , setOrderBy] = useState('id')
  const [sortIn , setSortIn] = useState('asc')
  const [first_name , setFirst_name] = useState('')

  useEffect(()=>{
    fetch(`http://localhost:3000/getData?currentPage=${currentPage}&orderBy=${orderBy}&sortIn=${sortIn}&first_name=${first_name}&take=${take}`)
    .then(data => data.json())
    .then((data)=>{
      console.log('data-----------' , data)
      setData(data.data)
      setDataCount(data.count)
    })
  },[currentPage , take , sortIn , orderBy  ,first_name])

  // let typingTimeout : any

  // const onChangeOfName = (e) =>{
  //   e.target.name = e.target.value
  //   setNameToSend(e.target.value)
  //   console.log(e.target.value)

  //   clearTimeout(typingTimeout)
  //       typingTimeout = setTimeout(()=>{
  //           console.log("you are typing")

  //           fetch(`http://localhost:3000/getData?first_name=${e.target.value}&takee=${pageCount}`)
  //           .then(data => data.json())
  //           .then((data)=>{
  //           console.log(data)
  //           setData(data.data)
  //           setDataCount(data.count)
  //           console.log("datacount---------" , data.count)
  //           })

  //       } , 500)
  //   }
  
  function onNameChange(e){
    setFirst_name(e.target.value)
    console.log(first_name)
  }

  const handleChange: OnChange = async (pagination ,filters, sorter ) => {
    console.log('Various parameters', pagination);
    console.log('Various filters', filters);
    console.log('Various filters', sorter);
    
    setCurrentPage(pagination.current ?? 1)
    setTake(pagination.pageSize ?? 10)
    setOrderBy( sorter.columnKey ?? 'id')
    setSortIn(sorter?.order  ?? null)
    console.log(currentPage , take , orderBy , sortIn )

    //const res = await getData(currentPage , take , orderBy , sortIn , first_name )

    // if(sortIn == "ascend"){
    //   sortIn = "asc"
    // }
    // else{
    //   sortIn = "desc"
    // }
    // console.log('333333333',pagination.pageSize)
    // let skip = 0
    // let idk =  pagination.pageSize ? pagination.pageSize : 10
    // if(page != 1){
    //    skip = (page - 1) * idk
    // }
    // else{
    //    skip = 0
    // }
    // console.log(page , orderBy , sortIn)
    // setPageCount(pagination.pageSize)
    // if(!orderBy){
    //   console.log("skipp------" , skip)
    //   fetch(`http://localhost:3000/getData?skip=${skip}&takee=${pagination.pageSize}`)
    //   .then(data => data.json())
    //   .then((data)=>{
    //   console.log(data)
    //   setData(data.data)
    //   })
    // }else{
    //   fetch(`http://localhost:3000/getData?skip=${skip}&orderBy=${orderBy}&sortIn=${sortIn}&first_name=${nameTOSend}&takee=${pagination.pageSize}`)
    //   .then(data => data.json())
    //   .then((data)=>{
    //   console.log(data)
    //   setData(data.data)
    //   })
    // }
    

    setSortedInfo(sorter as Sorts);

  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo?.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      sorter: () => 0,
      sortOrder: sortedInfo?.columnKey === 'first_name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      sorter: () => 0 ,
      sortOrder: sortedInfo?.columnKey === 'last_name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: () => 0 ,
      sortOrder: sortedInfo?.columnKey === 'email' ? sortedInfo.order : null,
      ellipsis: true,
    },
    
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: () => 0 ,
      sortOrder: sortedInfo?.columnKey === 'gender' ? sortedInfo.order : null,
      ellipsis: true,
    },
    
    {
      title: 'IP address',
      dataIndex: 'ip_address',
      key: 'ip_address',
      sorter: () => 0 ,
      sortOrder: sortedInfo?.columnKey === 'ip_address' ? sortedInfo.order : null,
      ellipsis: true,
    },
    
  ];

  return (
    <>
    <h1>Pagination</h1>
      <input type="text" placeholder='enter first name' name='first_Name' onChange={onNameChange}/>

      
      <Table<DataType> columns={columns} dataSource={data} onChange={handleChange} pagination={{total:dataCount,
      defaultCurrent:1,      
      }} />
    </>
  );

}
export default App;