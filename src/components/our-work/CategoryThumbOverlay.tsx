export default function CategoryThumbOverlay({
  tag,
  projectName,
  clientName,
}: {
  tag: string;
  projectName?: string;
  clientName?: string;
}) {
  return (
    <>
      <span className="work-thumb-tag">{tag}</span>
      {(projectName || clientName) && (
        <div className="work-thumb-info">
          {clientName && <span className="work-thumb-client">{clientName}</span>}
          {projectName && <span className="work-thumb-project">{projectName}</span>}
        </div>
      )}
    </>
  );
}
