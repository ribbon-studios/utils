import { DashboardButton } from '../dashboard/DashboardButton';
import { WSH } from '../terminal/WSH';

export function DashboardPage() {
  return (
    <div>
      <DashboardButton to="/terminal" label="Launch Terminal">
        <WSH demo />
      </DashboardButton>
    </div>
  );
}
