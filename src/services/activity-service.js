const serverAddress = 'http://localhost:8000';

const formatActivity = ({
  id,
  title,
  description,
  categoryId,
  img,
  category,
}) => ({
  id,
  title,
  description,
  categoryId,
  img,
  category: category.title,
});

const fetchAll = async () => {
  const response = await fetch(`${serverAddress}/activities?_expand=category`);
  const activities = await response.json();

  return activities.map(formatActivity);
};
const create = async (activityProps) => {
  const response = await fetch(`http://localhost:8000/activities/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(activityProps),
  });
  const activity = await response.json();

  return activity;
};

const remove = async (id) => {
  await fetch(`http://localhost:8000/activities/${id}`, {
    method: 'DELETE',
  });

  return true;
};

const fetchCategories = async () => {
  const response = await fetch(`${serverAddress}/categories`);
  const categories = await response.json();

  return categories;
};

const ActivityService = {
  fetchAll,
  create,
  remove,
  fetchCategories,
};

export default ActivityService;
