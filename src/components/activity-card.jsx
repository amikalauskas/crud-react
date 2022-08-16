import * as React from 'react';
import { Typography, Box, Card, CardContent, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Image from './image';
import TypographyLimited from './typography-limited';

const ActivityCard = ({
  title,
  img,
  description,
  category,
  onDelete,
  onEdit,
}) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '320px',
      height: '500px',
    }}
  >
    <Box
      sx={{
        width: '90%',
      }}
    >
      <Image src={img} sx={{ pt: 2 }} />
    </Box>
    <CardContent>
      <Box>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="subtitle" component="div" sx={{ mb: 2 }}>
        status: {category}
      </Typography>
      <TypographyLimited variant="body2" color="text.secondary">
        {description}
      </TypographyLimited>
    </CardContent>
    <Box sx={{ pb: 2 }}>
      <IconButton
        variant="outlined"
        color="error"
        size="small"
        onClick={onDelete}
      >
        <DeleteForeverIcon />
      </IconButton>
      <IconButton
        variant="outlined"
        color="success"
        size="small"
        onClick={onEdit}
      >
        <EditIcon />
      </IconButton>
    </Box>
  </Card>
);

export default ActivityCard;
