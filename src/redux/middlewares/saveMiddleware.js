export const SAVE = 'SAVE';

export function saveById(type, data) {
  return {
    ...data.reduce((accum, entry) => {
      const relations = {};
      for (const r in entry.relationships) {
        const relationship = entry.relationships[r].data;

        if (Array.isArray(relationship)) {
          relations[r + '_ids'] = relationship.map(rel => rel.id);
        } else if (relationship && relationship.id !== undefined) {
          relations[r + '_id'] = relationship.id;
        }
      }

      accum[entry.id] = {
        id: entry.id,
        ...entry.attributes,
        ...relations
      };
      return accum;
    }, {})
  };
}

const saveMiddleware = ({ getState, dispatch }) => next => ({ type, payload }) => {
  if (type === SAVE) {
    const data = payload.data || [];
    const entries = (Array.isArray(data) ? data : [data]).concat(payload.included || []);

    const entriesByType = entries.reduce((accum, entry) => {
      const entriesOfType = accum[entry.type] || [];
      entriesOfType.push(entry);
      accum[entry.type] = entriesOfType;
      return accum;
    }, {});

    payload = entriesByType;
  }

  next({ type, payload });
};

export default saveMiddleware;
