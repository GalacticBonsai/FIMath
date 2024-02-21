from typing import List

class Engine:
    def __init__(self, engine_name, configuration, years, stroke, bore, compression_ratio, displacement, horsepower, torque, redline):
        self.engine_name = engine_name
        self.configuration = configuration
        self.years = years
        self.stroke = stroke
        self.bore = bore
        self.compression_ratio = compression_ratio
        self.displacement = displacement
        self.horsepower = horsepower
        self.torque = torque
        self.redline = redline
    
    @classmethod
    def from_csv_line(cls, csv_line):
        data = csv_line.strip().split(',')
        
        # Replace '---' with None or empty string
        for i in range(len(data)):
            if data[i].strip() == '---':
                data[i] = None  # Replace '---' with None or ''
        if data[7]:  # Split horsepower if it exists
            data[7] = tuple(data[7].split('/'))
        if data[8]:  # Split torque if it exists
            data[8] = tuple(data[8].split('/'))

        # Make sure data has all fields before attempting to create the Engine object
        if len(data) == 10:
            return cls(*data)
        else:
            print("Error: Incomplete data in CSV line")
            print(data)
            return None

    def __str__(self):
        return f"Engine Name: {self.engine_name}\n" \
               f"Configuration: {self.configuration}\n" \
               f"Years: {self.years}\n" \
               f"Stroke: {self.stroke}\n" \
               f"Bore: {self.bore}\n" \
               f"Compression Ratio: {self.compression_ratio}\n" \
               f"Displacement: {self.displacement}\n" \
               f"Horsepower: {self.horsepower}\n" \
               f"Torque: {self.torque}\n" \
               f"Redline: {self.redline}\n"

def get_engine_data(csv = 'images/database.csv') -> List[Engine]:
  with open(csv, 'r', encoding='utf-8') as file:
        _ = file.readline() #strip the header
        lines = file.readlines()

  engines = []
  for line in lines:
      engine = Engine.from_csv_line(line)
      engines.append(engine)

  return engines

if __name__ == "__main__":
    engines = get_engine_data()
    
    for engine in engines:
        print(engine)
