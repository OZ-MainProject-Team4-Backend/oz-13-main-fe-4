import { useFavoriteLocations } from '../hooks/useFavoriteLocations';
import { DragEndEvent, PointerSensor, useSensor, useSensors, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box, styled } from '@mui/system';
import FavoriteLocationCard from './FavoriteLocationCard';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '16px',
});

export default function FavoriteLocationSection() {
  const { favorites, isLoading, deleteFavorite, updateAlias, reorderFavorites } =
    useFavoriteLocations();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = favorites.findIndex((item) => item.id === active.id);
      const newIndex = favorites.findIndex((item) => item.id === over.id);

      const newFavorites = [...favorites];
      const [movedItem] = newFavorites.splice(oldIndex, 1);
      newFavorites.splice(newIndex, 0, movedItem);

      const reorderData = newFavorites.map((item, index) => ({
        id: item.id,
        order: index,
      }));

      reorderFavorites(reorderData);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('이 즐겨찾기를 삭제하시겠습니까?')) {
      deleteFavorite(id);
    }
  };

  const handleAliasUpdate = (id: number, alias: string) => {
    updateAlias({ id, alias });
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <Container>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={favorites.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          {favorites.map((favorite) => (
            <FavoriteLocationCard
              key={favorite.id}
              favorite={favorite}
              onAliasUpdate={handleAliasUpdate}
              onDelete={handleDelete}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Container>
  );
}
