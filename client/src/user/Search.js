// import React, { useState, useEffect } from 'react';
// import Card from './Card';
// import { getCategories, list } from './apiCore';
//
// const Search = () => {
//     const [data, setData] = useState({
//         categories: [],
//         category: '',
//         search: '',
//         results: [],
//         searched: false
//
//     });
//
//     const {
//         categories,
//         category,
//         search,
//         results,
//         searched } = data;
//
//     useEffect(() => {
//         loadCategories();
//     }, []);
//
//     const loadCategories = () => {
//         getCategories().then(res => {
//             if (res.error) {
//                 console.log(res.error)
//             } else {
//                 setData({...data, categories: res});
//             }
//         })
//     }
//
//     const searchdata = () => {
//         if (search || category) {
//             list({
//                 search: search || undefined,
//                 category: category
//             })
//             .then(res => {
//                 if (res.error) {
//                     console.log(res.error);
//                 } else {
//                     setData({...data,
//                         results: res,
//                         searched: true
//                     });
//                 }
//             });
//         }
//     }
//
//     const searchSubmit = (e) => {
//         e.preventDefault();
//
//         searchdata();
//     }
//
//     const handleChange = name => event => {
//         setData({...data,
//             [name]: event.target.value,
//             searched: false
//         });
//     }
//
//     const searchMessage = (searched, products) => {
//         let prodsQty = products.length || 0;
//         let message = '';
//
//         if (searched) {
//             if (prodsQty > 0) {
//                 message = `Found ${prodsQty} products`;
//             } else {
//                 message = 'No products found';
//             }
//         }
//
//         return message;
//     }
//
//     const searchedProducts = (results = []) => {
//         return(
//             <div>
//                 <h2 className='mt-4 bm-4'>
//                     {searchMessage(searched, results)}
//                 </h2>
//                 <div className='row'>
//                     {results.map((p, i) => (
//                         <div className='col-4 mb-3'>
//                             <Card
//                                 key={i}
//                                 product={p}/>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//
//         );
//     }
//
//     const searchForm = () => {
//         return (
//             <form onSubmit={searchSubmit}>
//                 <span className='input-group-text'>
//                     <div className='input-group input-group-lg'>
//                         <div className='input-group-prepend'>
//                             <select
//                                 className='btn mr-2'
//                                 onChange={handleChange('category')}>
//                                 <option value="All">All</option>
//                                 {categories.map((c, i) => (
//                                     <option
//                                         key={i}
//                                         value={c._id}>
//                                         {c.name.substr(0, 20)}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <input
//                             type='search'
//                             className='form-control'
//                             onChange={handleChange('search')}
//                             placeholder='Serch by name'>
//                         </input>
//                     </div>
//                     <div
//                         className='btn input-group-append'
//                         style={{ border: 'none' }}>
//                         <button className='input-group-text'>
//                             Search
//                         </button>
//                     </div>
//                 </span>
//             </form>
//         );
//     }
//
//     return (
//         <div className='row'>
//             <div className='container-fluid mb-3'>
//                 {searchForm()}
//             </div>
//             <div className='container-fluid mb-3'>
//                 {searchedProducts(results)}
//             </div>
//         </div>
//     );
// }
//
// export default Search;
