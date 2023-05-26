import { useState } from "react"

const useForm = (initialState: any) => {
  const [state, setState] = useState(initialState);

  const handleChange = (name: string, value: any) => {
    setState((state: any) => ({ ...state, [name] : value }));
  }

  return [ state, handleChange ];
};

export default useForm;