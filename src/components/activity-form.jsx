import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  MenuItem,
} from '@mui/material';
import ActivityService from 'services/activity-service';

const ActivityForm = ({
  onSubmit,
  formTitle,
  submitText,
  initTitle,
  initCategory,
  Color,
  initImage,
  initDescription,
}) => {
  const [categories, setCategories] = React.useState([]);
  const [name, setName] = React.useState(initTitle);
  const [status, setStatus] = React.useState(initCategory);
  const [img, setImg] = React.useState(initImage);
  const [description, setDescription] = React.useState(initDescription);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title: name,
      categoryId: status,
      img,
      description,
    });
  };
  React.useEffect(() => {
    (async () => {
      const fetchedCategories = await ActivityService.fetchCategories();
      setCategories(fetchedCategories);
    })();
  }, []);

  return (
    <Paper
      onSubmit={handleSubmit}
      component="form"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        p: 3,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', pb: 2 }}>
        {formTitle}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Activity name"
          fullWidth
          variant="filled"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="Status"
          fullWidth
          select
          variant="filled"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          {categories.map(({ id, title }) => (
            <MenuItem key={id} value={id}>
              {title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Photo url"
          fullWidth
          variant="filled"
          value={img}
          onChange={(event) => setImg(event.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          variant="filled"
          multiline
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" variant="contained" color={Color} size="large">
            {submitText}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ActivityForm;
