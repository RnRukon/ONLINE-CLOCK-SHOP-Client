import React, { useEffect, useState } from 'react';
// import { Alert, AlertTitle, Button, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useForm } from "react-hook-form";
import axios from 'axios';

const UpdateProductFrom = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({}) || "";
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetch(`http://localhost:5000/placeProducts/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id, setProduct])
    // console.log(id)

    const { title, img, description, price } = product;






    const update = (data) => {
        console.log(data)
        axios.put(`http://localhost:5000/updateProduct/${id}`, data)
            .then(res => {
                if (res?.data?.modifiedCount) {
                    alert('Update SuccessFully')
                }
            })

        reset();
    }
    return (
        <div className=' h-screen update-form-bg'>
            <h1 className='text-yellow-400  text-center fw-bold underline uppercase py-11'>Update Product</h1>
            <div className='col-lg-6'>
                <div>

                </div>
            </div>

            <div className='container-fluid p-0 col-lg-6 bg-white card card-body p-3 shadow-2xl'>
                <form onSubmit={handleSubmit(update)}>

                    <input className="form-control rounded-pill " {...register('title', { required: true })} placeholder="Title" defaultValue={title} /> <br />

                    <input className="form-control rounded-pill" {...register('description', { required: true })} placeholder="Description" defaultValue={description} /> <br />

                    <input className="form-control rounded-pill" {...register('img', { required: true })} placeholder="Img URL" defaultValue={img} /> <br />

                    <input className="form-control rounded-pill" {...register('price', { required: true })} placeholder="Price" defaultValue={price} /> <br />

                    <input className="form-control rounded-pill  btn-warning shadow-xl " type="submit" value='Update' />
                </form><br />



            </div>

        </div>
    );
};

export default UpdateProductFrom;