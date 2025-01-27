import { Layout as DashboardLayout } from "/src/layouts/index.js";
import { CippTablePage } from "/src/components/CippComponents/CippTablePage.jsx";
import { useSettings } from "/src/hooks/use-settings";
import { EyeIcon } from "@heroicons/react/24/outline";

const Page = () => {
  const pageTitle = "Devices";
  const tenantFilter = useSettings().currentTenant;

  const actions = [
    {
      label: "Sync Device",
      type: "POST",
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "syncDevice",
      },
      confirmText: "Are you sure you want to sync this device?",
    },
    {
      label: "Reboot Device",
      type: "POST",
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "rebootNow",
      },
      confirmText: "Are you sure you want to reboot this device?",
    },
    {
      label: "Locate Device",
      type: "POST",
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "locateDevice",
      },
      confirmText: "Are you sure you want to locate this device?",
    },
    {
      label: "Retrieve LAPs password",
      type: "POST",
      url: "/api/ExecGetLocalAdminPassword",
      data: {
        GUID: "azureADDeviceId",
      },
      confirmText: "Are you sure you want to retrieve the local admin password?",
    },
    {
      label: "Rotate Local Admin Password",
      type: "POST",
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "RotateLocalAdminPassword",
      },
      confirmText: "Are you sure you want to rotate the password for this device?",
    },
    {
      label: "Retrieve Bitlocker Keys",
      type: "POST",
      url: "/api/ExecGetRecoveryKey",
      data: {
        GUID: "azureADDeviceId",
      },
      confirmText: "Are you sure you want to retrieve the Bitlocker keys?",
    },
    {
      label: "Windows Defender Full Scan",
      type: "POST",
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "WindowsDefenderScan",
        quickScan: false,
      },
      confirmText: "Are you sure you want to perform a full scan on this device?",
    },
    {
      label: "Windows Defender Quick Scan",
      type: "POST",
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "WindowsDefenderScan",
        quickScan: true,
      },
      confirmText: "Are you sure you want to perform a quick scan on this device?",
    },
    {
      label: "Update Windows Defender",
      type: "POST",
      url: "/api/ExecDeviceAction",
      data: {
        GUID: "id",
        Action: "windowsDefenderUpdateSignatures",
      },
      confirmText:
        "Are you sure you want to update the Windows Defender signatures for this device?",
    },
    {
      label: "View in InTune",
      link: `https://intune.microsoft.com/${tenantFilter}/#view/Microsoft_Intune_Devices/DeviceSettingsMenuBlade/~/overview/mdmDeviceId/[id]`,
      color: "info",
      icon: <EyeIcon />,
      target: "_blank",
      multiPost: false,
      external: true,
    },
  ];

  const offCanvas = {
    extendedInfoFields: ["deviceName", "userPrincipalName"],
    actions: actions,
  };

  return (
    <CippTablePage
      title={pageTitle}
      apiUrl="/api/ListDevices"
      actions={actions}
      offCanvas={offCanvas}
      simpleColumns={[
        "deviceName",
        "userPrincipalName",
        "complianceState",
        "manufacturer",
        "model",
        "operatingSystem",
        "osVersion",
        "enrolledDateTime",
        "managedDeviceOwnerType",
        "deviceEnrollmentType",
        "joinType",
      ]}
    />
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
