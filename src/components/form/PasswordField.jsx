"use client";
import { useState, useRef } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
export default function PasswordField({ id, name }) {
  const [pswIsVisible, setPswIsVisible] = useState(false);
  const pswRef = useRef(null);
  return (
    <div className="flex flex-col gap-1">
      <label className="capitalize text-white" htmlFor={id}>
        {name}
      </label>
      <div className="flex relative">
        <input
          ref={pswRef}
          className="p-2 text-black w-full"
          type={pswIsVisible ? "text" : "password"}
          id={id}
          name={name}
          required
          placeholder="********"
          autoComplete="on"
        />

        <button
          type="button"
          onClick={() => setPswIsVisible(!pswIsVisible)}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          {pswIsVisible ? (
            <AiFillEye size={20} className="text-gray-800" />
          ) : (
            <AiFillEyeInvisible className="text-gray-400" size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
