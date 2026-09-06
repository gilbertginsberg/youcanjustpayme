"use client";

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCreator } from "./CreatorProvider";
import { BlockEditor } from "./BlockEditor";

export function BlockList() {
  const { creator, reorderBlocks } = useCreator();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const blocks = [...creator.blocks].sort((a, b) => a.order - b.order);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const ids = blocks.map((b) => b.id);
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = [...ids];
    reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, String(active.id));
    reorderBlocks(reordered);
  }

  if (blocks.length === 0) {
    return (
      <div className="rounded-[var(--radius-card)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--text-muted)]">
        No ways to pay you yet. Add one — it&apos;s fine, people want to.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {blocks.length > 5 && (
        <div className="rounded-2xl bg-[var(--surface-2)] px-4 py-3 text-xs text-[var(--text-muted)]">
          Most pages convert better with 3-5 clear options — consider featuring your top pick
          instead of adding more.
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {blocks.map((block) => (
              <BlockEditor key={block.id} block={block} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
