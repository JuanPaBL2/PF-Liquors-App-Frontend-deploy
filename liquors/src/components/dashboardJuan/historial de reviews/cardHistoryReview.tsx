import React, { useState } from "react";
import { IReview } from "@/interfaces/interfaz";
import { Rating } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteReviewConAlert } from "@/utils/deleteReviewsConAlert";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export const CardHistoryReview: React.FC<{ product: IReview}> = ({product}): React.ReactNode => {

    const data = product.productId
    const name = data.name;
    const dispatch = useDispatch();

    const [errorDelete, setErrorDelete] = useState() 

    const handleDelete = async (id: string) => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
      
        try {
          const result = await swalWithBootstrapButtons.fire({
            title: "Estas seguro que deseas borrar la review?",
            text: "No puedes deshacer esta accion!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, borrar!",
            cancelButtonText: "No, cancelar!",
            reverseButtons: true
          });
      
          if (result.isConfirmed) {
            const deleteSuccessful = await deleteReviewConAlert(id, dispatch);
      
            if (deleteSuccessful) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            } else {
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: "Failed to delete the file.",
                icon: "error"
              });
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              icon: "error"
            });
          }
        } catch (error) {
          console.error("Error handling delete:", error);
          swalWithBootstrapButtons.fire({
            title: "Error al eliminar la review",
            text: ` ${error}`,
            icon: "error"
          });
        }
      };
    
    return (
        <>
             <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-md mx-4 my-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-800">{product.rate}</span>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                        <StarIcon
                            key={i}
                            className={i < product.rate ? "text-yellow-400" : "text-gray-300"}
                        />
                        ))}
                    </div>
                    </div>
                    <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 cursor-pointer hover:text-red-800 transition-colors">
                        <DeleteIcon />
                    </button>
                </div>
                <p className="text-gray-600 italic">&quot;{product.comment}&quot;</p>
                <h3 className="text-right text-sm font-medium text-gray-500">{name}</h3>
            </div>
        </>
    )
}