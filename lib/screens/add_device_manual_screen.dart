import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/data_constants.dart';
import '../models/models.dart';
import '../widgets/device_icon.dart';

class AddDeviceManualScreen extends StatefulWidget {
  final VoidCallback onBack;
  final VoidCallback onNearbyDevices;
  final Function(Device) onSelectDevice;
  final VoidCallback onScan;

  const AddDeviceManualScreen({
    super.key,
    required this.onBack,
    required this.onNearbyDevices,
    required this.onSelectDevice,
    required this.onScan,
  });

  @override
  State<AddDeviceManualScreen> createState() => _AddDeviceManualScreenState();
}

class _AddDeviceManualScreenState extends State<AddDeviceManualScreen> {
  int _activeTab = 1;
  int _selectedCategoryIndex = 0;

  List<Device> get _filteredDevices {
    if (_selectedCategoryIndex == 0) return manualDevices;
    final cat = categories[_selectedCategoryIndex].toLowerCase();
    return manualDevices.where((d) {
      if (cat == 'lightning') return d.type == DeviceType.lamp;
      if (cat == 'camera') return d.type == DeviceType.cctv || d.type == DeviceType.webcam;
      if (cat == 'electrical') return d.type == DeviceType.router;
      if (cat == 'entertainment') return d.type == DeviceType.speaker;
      return true;
    }).toList();
  }

  String _deviceIconType(Device d) {
    switch (d.type) {
      case DeviceType.lamp: return 'lamp';
      case DeviceType.cctv: return d.name.contains('V1') ? 'cctv-v1' : 'cctv-v2';
      case DeviceType.webcam: return 'webcam';
      case DeviceType.speaker: return 'speaker';
      case DeviceType.router: return 'router';
      default: return 'lamp';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  IconButton(onPressed: widget.onBack, icon: const Icon(Icons.arrow_back, size: 28)),
                  const Expanded(
                    child: Text(
                      'Add Device',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 17, fontWeight: FontWeight.w600),
                    ),
                  ),
                  IconButton(onPressed: widget.onScan, icon: const Icon(Icons.qr_code_scanner, size: 28)),
                ],
              ),
            ),
            // Tabs
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: AppColors.muted.withValues(alpha: 0.3),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    _buildTab('Nearby Devices', 0),
                    _buildTab('Add Manual', 1),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            // Category tabs
            SizedBox(
              height: 40,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: categories.length,
                itemBuilder: (context, i) {
                  final isSelected = _selectedCategoryIndex == i;
                  return GestureDetector(
                    onTap: () => setState(() => _selectedCategoryIndex = i),
                    child: Container(
                      margin: const EdgeInsets.only(right: 8),
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      decoration: BoxDecoration(
                        color: isSelected ? AppColors.primary : AppColors.muted.withValues(alpha: 0.5),
                        borderRadius: BorderRadius.circular(20),
                        border: isSelected ? null : Border.all(color: AppColors.border),
                      ),
                      alignment: Alignment.center,
                      child: Text(
                        categories[i],
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w500,
                          color: isSelected ? Colors.white : AppColors.mutedForeground,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 16),
            // Device grid
            Expanded(
              child: GridView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 12,
                  crossAxisSpacing: 12,
                ),
                itemCount: _filteredDevices.length,
                itemBuilder: (context, index) {
                  final device = _filteredDevices[index];
                  return GestureDetector(
                    onTap: () => widget.onSelectDevice(device),
                    child: Container(
                      decoration: BoxDecoration(
                        color: AppColors.muted.withValues(alpha: 0.3),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          DeviceIcon(type: _deviceIconType(device), size: 96),
                          const SizedBox(height: 8),
                          Text(
                            device.name,
                            style: const TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w500,
                              color: AppColors.foreground,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTab(String label, int index) {
    final isActive = _activeTab == index;
    return Expanded(
      child: GestureDetector(
        onTap: () {
          setState(() => _activeTab = index);
          if (index == 0) widget.onNearbyDevices();
        },
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: isActive ? AppColors.primary : Colors.transparent,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w500,
              color: isActive ? Colors.white : AppColors.mutedForeground,
            ),
          ),
        ),
      ),
    );
  }
}
