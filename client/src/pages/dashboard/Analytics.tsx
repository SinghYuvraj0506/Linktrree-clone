import { authActions } from "@/lib/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/global/Loader";

const Analytics = () => {
  const dispatch = useAppDispatch();
  const { funcLoading, analyticsData } = useAppSelector((state) => state.auth);
  const { links } = useAppSelector((state) => state.links);
  const { getAnalytics } = authActions;

  // Total Link Clicks
  const totalLinkClicks = analyticsData?.linksStats?.reduce(
    (total, link) => total + link._count.id,
    0
  ) ?? 0;

  // Aggregate Visits by City
  const cityVisits: Record<string, number> = analyticsData?.slugStats?.reduce((acc, visit) => {
    const city = visit.city || "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {} as any) ?? {};

  // Top Cities Sorted by Visits
  const sortedCities = Object.entries(cityVisits).sort(
    (a: [string, number], b: [string, number]) => b[1] - a[1]
  );

  useEffect(() => {
    dispatch(getAnalytics());
  }, []);

  if (funcLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Profile Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl font-bold">
              {analyticsData?.slugStats?.length}
            </h2>
            <p className="text-sm text-muted-foreground">
              Total visits to your profile
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Link Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl font-bold">{totalLinkClicks}</h2>
            <p className="text-sm text-muted-foreground">
              Total clicks across all your links
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Links Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Links Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Link ID</TableCell>
                <TableCell>Clicks</TableCell>
                <TableCell>Insights</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {analyticsData?.linksStats?.map((link, index) => (
                <TableRow key={index}>
                  <TableCell>{links?.find(e=>e.id === link.linkId)?.title }</TableCell>
                  <TableCell>{link._count.id}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {((link._count.id / totalLinkClicks) * 100).toFixed(1)}%
                      of total clicks
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Cities Section */}
      <Card>
        <CardHeader>
          <CardTitle>Top Cities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>City</TableCell>
                <TableCell>Visits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCities.map(([city, visits], index) => (
                <TableRow key={index}>
                  <TableCell>{city}</TableCell>
                  <TableCell>{visits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
