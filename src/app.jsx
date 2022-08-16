import * as React from 'react';

import { Box, Grid, Modal } from '@mui/material';

import ActivityService from 'services/activity-service';

import ActivityForm from 'components/activity-form';
import { Header, ActivityCard } from './components';

const App = () => {
  const [activities, setActivities] = React.useState([]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [activityBeeingEdited, setACtivityBeeingEdited] = React.useState(null);
  const closeModal = () => {
    setModalOpen(false);
    setACtivityBeeingEdited(null);
  };

  const fetchAllactivity = async () => {
    const fetchedActivities = await ActivityService.fetchAll();

    setActivities(fetchedActivities);
  };
  const createActivity = async (activityProps) => {
    await ActivityService.create(activityProps);
    await fetchAllactivity();
    setModalOpen(false);
  };

  const editActivity = (id) => {
    const foundActivity = activities.find((ac) => ac.id === id);
    setACtivityBeeingEdited(foundActivity);
    setModalOpen(true);
  };

  const removeActivity = async (id) => {
    await ActivityService.remove(id);

    fetchAllactivity();
  };

  React.useEffect(() => {
    fetchAllactivity();
  }, []);

  return (
    <Box
      sx={{
        gap: { xs: 4, xxl: 0 },

        pt: 2,

        px: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Header
          openModal={() => setModalOpen(true)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '320px',
            mt: 2,
          }}
        />
      </Box>

      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
            maxWidth: '320px',
          }}
        >
          <ActivityForm
            onSubmit={createActivity}
            formTitle={
              activityBeeingEdited ? 'Edit activity' : 'Create new activity'
            }
            initCategory={activityBeeingEdited?.categoryId ?? ''}
            initTitle={activityBeeingEdited?.title ?? ''}
            submitText={activityBeeingEdited ? 'Edit' : 'Create'}
            Color={activityBeeingEdited ? 'warning' : 'success'}
            initImage={activityBeeingEdited?.img ?? ''}
            initDescription={activityBeeingEdited?.description ?? ''}
          />
        </Box>
      </Modal>

      <Grid container spacing={3}>
        {activities.map(({ id, title, description, category, img }) => (
          <Grid key={id} item>
            <ActivityCard
              title={title}
              description={description}
              img={img}
              category={category}
              onDelete={() => removeActivity(id)}
              onEdit={() => editActivity(id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default App;
