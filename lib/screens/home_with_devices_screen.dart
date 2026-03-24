import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/data_constants.dart';
import '../models/models.dart';
import '../widgets/device_icon.dart';

class HomeWithDevicesScreen extends StatefulWidget {
  final Function(String) onNavigate;
  final VoidCallback onShowAddMenu;
  final VoidCallback onShowSwitchHome;

  const HomeWithDevicesScreen({
    super.key,
    required this.onNavigate,
    required this.onShowAddMenu,
    required this.onShowSwitchHome,
  });

  @override
  State<HomeWithDevicesScreen> createState() => _HomeWithDevicesScreenState();
}

class _HomeWithDevicesScreenState extends State<HomeWithDevicesScreen> {
  String _selectedRoom = 'Living Room';
  int _activeNav = 0;
  late Map<int, bool> _deviceStates;

  @override
  void initState() {
    super.initState();
    _deviceStates = {
      for (var d in homeDevices) d['id'] as int: d['isOn'] as bool,
    };
  }

  void _toggle(int id) => setState(() => _deviceStates[id] = !(_deviceStates[id]!));

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: SafeArea(
        bottom: false,
        child: Stack(
          children: [
            Column(
              children: [
                // Header
                Container(
                  padding: const EdgeInsets.all(16),
                  color: Colors.white,
                  child: Row(
                    children: [
                      GestureDetector(
                        onTap: widget.onShowSwitchHome,
                        child: Row(
                          children: [
                            const Text(
                              'My Home',
                              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                            ),
                            Icon(Icons.keyboard_arrow_down, color: AppColors.mutedForeground),
                          ],
                        ),
                      ),
                      const Spacer(),
                      _CircleBtn(
                        child: const Icon(Icons.psychology, size: 22, color: AppColors.primary),
                        borderColor: AppColors.primary,
                      ),
                      const SizedBox(width: 8),
                      _CircleBtn(
                        child: const Icon(Icons.notifications_outlined, size: 22),
                        borderColor: const Color(0xFFFB923C),
                        badge: true,
                      ),
                    ],
                  ),
                ),
                // Content
                Expanded(
                  child: SingleChildScrollView(
                    child: Column(
                      children: [
                        // Weather card
                        Container(
                          margin: const EdgeInsets.all(16),
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: AppColors.primary,
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Row(
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        const Text(
                                          '20',
                                          style: TextStyle(fontSize: 40, fontWeight: FontWeight.w300, color: Colors.white),
                                        ),
                                        const Text('°C', style: TextStyle(fontSize: 16, color: Colors.white)),
                                      ],
                                    ),
                                    Text(
                                      mockWeather.city,
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: Colors.white.withValues(alpha: 0.9),
                                      ),
                                    ),
                                    Text(
                                      mockWeather.condition,
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: Colors.white.withValues(alpha: 0.8),
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    Row(
                                      children: [
                                        _WeatherChip(label: 'AQI ${mockWeather.aqi}', color: const Color(0xFF86EFAC)),
                                        const SizedBox(width: 8),
                                        _WeatherChip(label: '${mockWeather.humidity.toStringAsFixed(0)}%', emoji: '💧'),
                                        const SizedBox(width: 8),
                                        _WeatherChip(label: '${mockWeather.windSpeed} m/s', emoji: '💨'),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                              SizedBox(
                                width: 96,
                                height: 72,
                                child: CustomPaint(
                                  painter: _WeatherIconPainter2(),
                                ),
                              ),
                            ],
                          ),
                        ),
                        // Category cards
                        SizedBox(
                          height: 100,
                          child: ListView.builder(
                            scrollDirection: Axis.horizontal,
                            padding: const EdgeInsets.symmetric(horizontal: 16),
                            itemCount: categoryCards.length,
                            itemBuilder: (context, i) {
                              final cat = categoryCards[i];
                              return GestureDetector(
                                onTap: () {
                                  final label = (cat['label'] as String).toLowerCase();
                                  if (label == 'lightning') widget.onNavigate('lightning');
                                  if (label == 'cameras') widget.onNavigate('cameras');
                                },
                                child: Container(
                                  width: 110,
                                  margin: const EdgeInsets.only(right: 12),
                                  padding: const EdgeInsets.all(12),
                                  decoration: BoxDecoration(
                                    color: (cat['bgColor'] as Color),
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Icon(cat['icon'] as IconData, size: 24, color: cat['iconColor'] as Color),
                                      Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            cat['label'] as String,
                                            style: const TextStyle(
                                              fontSize: 13,
                                              fontWeight: FontWeight.w600,
                                              color: AppColors.foreground,
                                            ),
                                          ),
                                          Text(
                                            '${cat['count']} devices',
                                            style: TextStyle(
                                              fontSize: 11,
                                              color: AppColors.mutedForeground,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                        const SizedBox(height: 16),
                        // All Devices
                        Container(
                          margin: const EdgeInsets.symmetric(horizontal: 16),
                          decoration: const BoxDecoration(color: Colors.white),
                          child: Column(
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(16),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    const Text(
                                      'All Devices',
                                      style: TextStyle(fontSize: 17, fontWeight: FontWeight.w600),
                                    ),
                                    Icon(Icons.more_vert, color: AppColors.mutedForeground),
                                  ],
                                ),
                              ),
                              // Room filter
                              SizedBox(
                                height: 40,
                                child: ListView.builder(
                                  scrollDirection: Axis.horizontal,
                                  padding: const EdgeInsets.symmetric(horizontal: 16),
                                  itemCount: roomTabs.length,
                                  itemBuilder: (ctx, i) {
                                    final room = roomTabs[i];
                                    final isSel = _selectedRoom == room;
                                    return GestureDetector(
                                      onTap: () => setState(() => _selectedRoom = room),
                                      child: Container(
                                        margin: const EdgeInsets.only(right: 8),
                                        padding: const EdgeInsets.symmetric(horizontal: 14),
                                        decoration: BoxDecoration(
                                          color: isSel ? AppColors.primary : Colors.white,
                                          borderRadius: BorderRadius.circular(20),
                                          border: isSel ? null : Border.all(color: AppColors.border),
                                        ),
                                        alignment: Alignment.center,
                                        child: Text(
                                          room,
                                          style: TextStyle(
                                            fontSize: 13,
                                            fontWeight: FontWeight.w500,
                                            color: isSel ? Colors.white : AppColors.mutedForeground,
                                          ),
                                        ),
                                      ),
                                    );
                                  },
                                ),
                              ),
                              const SizedBox(height: 16),
                              // Devices grid
                              GridView.builder(
                                shrinkWrap: true,
                                physics: const NeverScrollableScrollPhysics(),
                                padding: const EdgeInsets.symmetric(horizontal: 16),
                                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                                  crossAxisCount: 2,
                                  mainAxisSpacing: 12,
                                  crossAxisSpacing: 12,
                                  childAspectRatio: 1.0,
                                ),
                                itemCount: homeDevices.length,
                                itemBuilder: (ctx, i) {
                                  final dev = homeDevices[i];
                                  final type = _typeStr(dev['type'] as DeviceType);
                                  final hasLive = dev['hasImage'] as bool;
                                  return _DeviceCard(
                                    device: dev,
                                    type: type,
                                    hasLive: hasLive,
                                    isOn: _deviceStates[dev['id']]!,
                                    onTap: () => widget.onNavigate('control-${_typeStr(dev['type'] as DeviceType)}'),
                                    onToggle: () => _toggle(dev['id'] as int),
                                  );
                                },
                              ),
                              const SizedBox(height: 120),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                // Bottom nav
                Container(
                  color: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _NavItem(icon: Icons.home, label: 'Home', isActive: _activeNav == 0, onTap: () {}),
                      _NavItem(icon: Icons.checklist, label: 'Smart', isActive: _activeNav == 1, onTap: () {}),
                      _NavItem(icon: Icons.bar_chart, label: 'Reports', isActive: _activeNav == 2, onTap: () {}),
                      _NavItem(icon: Icons.person_outline, label: 'Account', isActive: _activeNav == 3, onTap: () {}),
                    ],
                  ),
                ),
              ],
            ),
            // FABs
            Positioned(
              bottom: 80,
              right: 16,
              child: Column(
                children: [
                  _FAB(child: const Icon(Icons.mic, color: AppColors.primary, size: 22)),
                  const SizedBox(height: 12),
                  _FAB(
                    color: AppColors.primary,
                    child: const Icon(Icons.add, color: Colors.white, size: 28),
                    onTap: widget.onShowAddMenu,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _typeStr(DeviceType type) {
    switch (type) {
      case DeviceType.lamp: return 'lamp';
      case DeviceType.cctv: return 'cctv';
      case DeviceType.speaker: return 'speaker';
      case DeviceType.router: return 'router';
      case DeviceType.ac: return 'ac';
      case DeviceType.webcam: return 'webcam';
    }
  }
}

class _CircleBtn extends StatelessWidget {
  final Widget child;
  final Color borderColor;
  final bool badge;
  const _CircleBtn({required this.child, required this.borderColor, this.badge = false});
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 40,
      height: 40,
      child: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: borderColor, width: 1.5),
            ),
            child: Center(child: child),
          ),
          if (badge)
            Positioned(
              top: 4,
              right: 4,
              child: Container(
                width: 8,
                height: 8,
                decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle),
              ),
            ),
        ],
      ),
    );
  }
}

class _WeatherChip extends StatelessWidget {
  final String label;
  final Color color;
  final String? emoji;
  const _WeatherChip({required this.label, this.color = Colors.white, this.emoji});
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (emoji != null) ...[
            Text(emoji!, style: const TextStyle(fontSize: 11)),
            const SizedBox(width: 2),
          ],
          Text(
            label,
            style: TextStyle(fontSize: 11, color: color == Colors.white ? Colors.white : AppColors.foreground),
          ),
        ],
      ),
    );
  }
}

class _WeatherIconPainter2 extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final sun = Paint()..color = const Color(0xFFFBBF24);
    canvas.drawCircle(Offset(size.width * 0.7, size.height * 0.5), 16, sun);

    final cloud = Paint()..color = Colors.white;
    final c = Offset(size.width * 0.45, size.height * 0.6);
    canvas.drawOval(Rect.fromCenter(center: c, width: size.width * 0.6, height: size.height * 0.35), cloud);
    canvas.drawOval(Rect.fromCenter(center: Offset(c.dx - 18, c.dy - 10), width: 26, height: 20), cloud);
    canvas.drawOval(Rect.fromCenter(center: Offset(c.dx + 14, c.dy - 8), width: 28, height: 22), cloud);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _DeviceCard extends StatelessWidget {
  final Map<String, dynamic> device;
  final String type;
  final bool hasLive;
  final bool isOn;
  final VoidCallback onTap;
  final VoidCallback onToggle;

  const _DeviceCard({
    required this.device,
    required this.type,
    required this.hasLive,
    required this.isOn,
    required this.onTap,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    if (hasLive) {
      return GestureDetector(
        onTap: onTap,
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Stack(
            children: [
              // Background
              Positioned.fill(
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    gradient: const LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [Color(0xFFFDE68A), Color(0xFFFEF3C7)],
                    ),
                  ),
                ),
              ),
              // Live badge
              Positioned(
                top: 8,
                left: 8,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: Colors.black54,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: 6,
                        height: 6,
                        decoration: const BoxDecoration(
                          color: Colors.red,
                          shape: BoxShape.circle,
                        ),
                      ),
                      const SizedBox(width: 4),
                      const Text(
                        'Live',
                        style: TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.w500),
                      ),
                    ],
                  ),
                ),
              ),
              // Toggle
              Positioned(
                top: 8,
                right: 8,
                child: GestureDetector(onTap: onToggle, child: _ToggleSwitch(isOn: isOn)),
              ),
              // Name
              Positioned(
                bottom: 8,
                left: 8,
                child: Text(
                  device['name'] as String,
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
                ),
              ),
            ],
          ),
        ),
      );
    }

    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
        ),
        padding: const EdgeInsets.all(12),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                DeviceIcon(type: type, size: 48),
                GestureDetector(onTap: onToggle, child: _ToggleSwitch(isOn: isOn)),
              ],
            ),
            const Spacer(),
            Row(
              children: [
                Icon(
                  device['connection'] == 'wifi' ? Icons.wifi : Icons.bluetooth,
                  size: 12,
                  color: AppColors.mutedForeground,
                ),
                const SizedBox(width: 4),
                Expanded(
                  child: Text(
                    device['name'] as String,
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _ToggleSwitch extends StatelessWidget {
  final bool isOn;
  const _ToggleSwitch({required this.isOn});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 44,
      height: 24,
      padding: const EdgeInsets.all(2),
      decoration: BoxDecoration(
        color: isOn ? AppColors.primary : AppColors.muted,
        borderRadius: BorderRadius.circular(12),
      ),
      child: AnimatedAlign(
        alignment: isOn ? Alignment.centerRight : Alignment.centerLeft,
        duration: const Duration(milliseconds: 200),
        child: Container(
          width: 20,
          height: 20,
          decoration: const BoxDecoration(
            color: Colors.white,
            shape: BoxShape.circle,
          ),
        ),
      ),
    );
  }
}

class _FAB extends StatelessWidget {
  final Widget child;
  final Color color;
  final VoidCallback? onTap;
  const _FAB({required this.child, this.color = Colors.white, this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 56,
        height: 56,
        decoration: BoxDecoration(
          color: color,
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.1),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Center(child: child),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isActive;
  final VoidCallback onTap;
  const _NavItem({required this.icon, required this.label, required this.isActive, required this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            isActive ? Icons.home : icon,
            size: 22,
            color: isActive ? AppColors.primary : AppColors.mutedForeground,
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 11,
              fontWeight: isActive ? FontWeight.w600 : FontWeight.normal,
              color: isActive ? AppColors.primary : AppColors.mutedForeground,
            ),
          ),
        ],
      ),
    );
  }
}
