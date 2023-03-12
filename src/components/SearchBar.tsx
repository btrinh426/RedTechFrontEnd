import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
};

const style = {
  Button: {
    // width: 400,
    marginRight: "1rem",
  },
  // BigButton: {
  //   width: 1000,
  // }
};

export const SearchBar: React.FC<Props> = ({ setSearchQuery }) => {

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e : any) => {
    setSearchQuery(e.target.value);
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div>
        <TextField label="Search" name="searchBar" placeholder="Search Order ID" value={searchValue} onChange={handleSearch} />
        <Button sx={{ ...style.Button }} variant="contained" color="primary" endIcon={<SearchIcon />} />
      </div>
    </>
  );
};

export default SearchBar;