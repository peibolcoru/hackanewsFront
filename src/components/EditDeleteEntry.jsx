import { useContext, useState } from 'react';
import { LoginContext } from '../context/LoginContext';
import { deleteEntryService } from '../services/entriesServices';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './EditDeleteEntry.css';


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getToken } from '../utilities/getToken';
export default function EditDeleteEntry({ results }) {
    const [error, setError] = useState('');
    const token = getToken();
    const navigate = useNavigate();
    const idNew = results[0].id;

   async function handleDelete(id, token) {
        try {
            await deleteEntryService(id, token);
            navigate('/mynews');
        } catch (error) {
            setError(error.message);
        }}
    
    const deletePopUp = () => {
        withReactContent(Swal).fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
             handleDelete(idNew, token)    
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
        })
      }

    return (
        <section className="btn_edit_delete">
            <Button
                className="btn_full_entry btn_custom_hover"
                variant="secondary"
                onClick={() => {
                    navigate(`/entries/update/${idNew}`);
                }}
            >
                EDITAR
            </Button>
            <Button
                className="btn_full_entry btn_custom_hover"
                variant="secondary"
                onClick={deletePopUp}
            >
                ELIMINAR
            </Button>
            {error ? <p>{error}</p> : null}
        </section>
    );
}
