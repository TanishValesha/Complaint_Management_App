import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  total?: number;
  icon: LucideIcon;
  iconColor: string;
  footerText: string;
  footerBgColor: string;
  footerTextColor: string;
}

export default function StatCard({
  title,
  value,
  total,
  icon: Icon,
  iconColor,
  footerText,
  footerBgColor,
  footerTextColor,
}: StatCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow-lg rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                {total && (
                  <div className="ml-2">
                    <span className="text-sm text-gray-500">
                      ({((value / total) * 100).toFixed(1)}%)
                    </span>
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={`${footerBgColor} px-5 py-3`}>
        <div className="text-sm">
          <span className={`font-medium ${footerTextColor}`}>{footerText}</span>
        </div>
      </div>
    </div>
  );
}
