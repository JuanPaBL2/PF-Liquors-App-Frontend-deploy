"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

import { RootState } from "@/store/store";
import { IReview } from "@/interfaces/interfaz";

import { deleteReviews } from "@/store/reducers/reviewsSlice";
import { deleteReview, editReview } from "@/utils/deleteReviews";

export const Review = ({ review }: { review: IReview }) => {
  const [data, setData] = useState<any>(null);
  const [editOn, setEditOn] = useState(false);
  const [formData, setFormData] = useState({
    rate: review.rate,
    comment: review.comment,
  });

  const dispatch = useDispatch();
  const dataReviews: IReview[] = useSelector(
    (state: RootState) => state.reviews.data
  );

  useEffect(() => {
    const userDataLogin = localStorage.getItem("userDataLogin");
    if (userDataLogin) {
      const userData = JSON.parse(userDataLogin);
      setData(userData);
    }
  }, []);

  const { id, rate, comment, userId } = review;
  const { name } = userId;

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    setFormData({ ...formData, rate: value ?? 0 });
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta review?")) {
      try {
        await deleteReview(id, dispatch);
        alert("Review eliminada con éxito.");
      } catch (error) {
        console.error("Error eliminando la review:", error);
        alert("Hubo un error eliminando la review.");
      }
    }
  };

  const handleEditToggle = () => {
    setEditOn(!editOn);
  };

  const sendEdit = async (id: string) => {
    try {
      await editReview(id, dispatch, { ...formData });
      alert("Review editada con éxito.");
      setEditOn(false);
    } catch (error) {
      console.error("Error editando la review:", error);
      alert("Hubo un error editando la review.");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-md mx-4 my-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {editOn ? (
            <Stack spacing={1}>
              <Rating
                name="rate"
                value={formData.rate}
                defaultValue={0}
                getLabelText={(value: number) =>
                  `${value} Star${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
                onChange={handleRatingChange}
                className="text-yellow-400"
              />
            </Stack>
          ) : (
            <div className="flex">
              <span className="text-xl font-bold text-gray-800">{rate}</span>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={i < rate ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
          )}
        </div>
        {data?.name === name && (
          <div>
            <button
              onClick={handleEditToggle}
              className="text-black-500 hover:text-black transition-colors"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => handleDelete(id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>
      {editOn ? (
        <>
          <input
            type="text"
            value={formData.comment}
            name="comment"
            placeholder="Publica aquí tu Review"
            onChange={handlerChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine"
          />
          <button
            onClick={() => {
              sendEdit(review.id);
            }}
            type="submit"
            className="bg-wine text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Editar opinión
          </button>
        </>
      ) : (
        <p className="text-gray-600 italic">{comment}</p>
      )}
      <h3 className="text-right text-sm font-medium text-gray-500">- {name}</h3>
    </div>
  );
};
