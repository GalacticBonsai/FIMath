import matplotlib.pyplot as plt
import numpy as np
import engine

def main():
    engine_list = engine.get_engine_data()

    strokes = []
    rpms = []
    for e in engine_list:
        erpm = e.redline
        if not erpm:
            if e.horsepower is not None and len(e.horsepower) > 1:
                rpm_text = e.horsepower[1]
                if '-' in rpm_text:
                    # Split the range and calculate the midpoint
                    rpm_range = rpm_text.split('-')
                    rpm_min = int(rpm_range[0])
                    rpm_max = int(rpm_range[1].split()[0])  # Remove 'rpm' from the upper bound
                    erpm = (rpm_min + rpm_max) / 2
                else:
                    # If not a range, just convert the string to an integer
                    erpm = int(rpm_text.split()[0])  # Remove 'rpm' from the string
            else:
                erpm = None
        if e.stroke and erpm:
          strokes.append(e.stroke)
          rpms.append(erpm)
      
      
    # Create scatter plot
    plt.figure(figsize=(8, 6))
    plt.scatter(strokes, rpms, color='blue', alpha=0.5, label='Data Points')
    plt.title('Stroke vs RPM')
    plt.xlabel('Stroke (mm)')
    plt.ylabel('RPM')
    plt.grid(True)

    # Define stroke values for the line
    stroke_values = np.array(strokes)
    # Calculate corresponding RPM values
    rpm_values = stroke_values / (25 * 30000) 

    # Plot the line representing the relationship between RPM and stroke
    plt.plot(strokes, rpm_values, color='red', linestyle='--', label='rpm = (25 * 30000) / stroke')

    # Add legend
    plt.legend()

    # Show the plot
    plt.show()

if __name__ == "__main__":
  main()